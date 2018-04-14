const express = require("express");
const router = express.Router();
const _ = require("lodash");
const db = require("../../models");

router.get("/user", (req, res, next) => {
    db.Book.findAll({
        include: [
            {
                model: db.User,
                where: {
                    id: req.user.id
                }
            },
            {
                model: db.Exchange
            }
        ]
    }).then(books => {
        _.each(books, book => {
            let found = false;
            for (let i = 0; i < book.Exchanges.length && !found; i++) {
                const exchange = book.Exchanges[i];

                if (!exchange.endDate) {
                    found = true;
                }
            }

            book.available = !found;
        });


        res.json(books);
    }).catch(err => console.log(err));
});

router.get("/", (req, res, next) => {
    db.Book.findAll({
        include: [
            {
                model: db.Exchange
            },
            {
                model: db.User
            }
        ]
    }).then(books => {
        const counts = {};

        _.each(books, book => {
            counts[book.isbn] = book.Users.length;
        });

        // {
        //     "123": 2,
        //     "456": 2,
        //     "789": 1
        // }

        // ===============

        // {
        //     "123": 1,
        //     "456": 1,
        //     "789": 0
        // }

        // book 789 is not available

        _.each(books, book => {
            const trxUsers = _.groupBy(book.Exchanges, "UserId");

            _.each(trxUsers, trxUserArr => {
                _.each(trxUserArr, trx => {
                    if (!trx.endDate) {
                        counts[`${book.isbn}`] -= 1;
                    }
                });
            });

            // {
            //     1: [
            //         {
            //             id: 1,
            //             startDate: "",
            //             endDate: null,
            //             BookId: 123,
            //             UserId: 1
            //         },
            //         {
            //             id: 4,
            //             startDate: "",
            //             endDate: null,
            //             BookId: 456,
            //             UserId: 1
            //         }
            //     ],
            //     2: [
            //         {
            //             id: 2,
            //             startDate: "",
            //             endDate: "",
            //             BookId: 123,
            //             UserId: 2
            //         },
            //         {
            //             id: 3,
            //             startDate: "",
            //             endDate: "",
            //             BookId: 456,
            //             UserId: 2
            //         },
            //         {
            //             id: 5,
            //             startDate: "",
            //             endDate: null,
            //             BookId: 789,
            //             UserId: 2
            //         }
            //     ]
            // }
        });

        const availableBooks = _.filter(books, book => {
            let found = false;

            for (let i = 0; i < book.Users.length && !found; i++) {
                const user = book.Users[i];

                if (user.id === req.user.id) {
                    found = true;
                }
            }

            if (found) {
                return false;
            } else {
                return counts[`${book.isbn}`] !== 0;
            }
        });

         _.each(availableBooks, book => {
            book.dataValues.count = counts[`${book.isbn}`];
        });

        res.json(availableBooks);
    }).catch(err => console.log(err));
});

router.post("/", (req, res, next) => {
   db.Book.create(req.body)
     .then(book => {
         return db.UserBook.create({
             BookIsbn: book.isbn,
             UserId: req.user.id
         });
   })
     .then(() => {
        res.end();
     })
     .catch(err => console.log(err));
});

router.delete("/:bookId", (req, res, next) => {
    db.UserBook.destroy({
        where: {
            BookIsbn: req.params.bookId,
            UserId: req.user.id
        }
    }).then(() => {
        res.end();
    }).catch(err => console.log(err));
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;