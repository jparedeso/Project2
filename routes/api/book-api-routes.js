const express = require("express");
const router = express.Router();
const _ = require("lodash");
const db = require("../../models");

router.get("/user", isLoggedIn, (req, res, next) => {
    db.Book.findAll({
        include: [
            {
                model: db.UserBook,
                where: {
                    UserId: req.user.id
                },
                include: [
                    {
                        model: db.User
                    },
                    {
                        model: db.Exchange
                    }
                ]
            }
        ]
    }).then(books => {
        _.each(books, book => {
            let found = false;

            _.each(book.UserBooks, userBook => {
                for (let i = 0; i < userBook.Exchanges.length && !found; i++) {
                    const exchange = userBook.Exchanges[i];

                    if (!exchange.endDate) {
                        found = true;
                    }
                }
            });

            book.available = !found;
        });


        res.json(books);
    }).catch(err => console.log(err));
});

router.get("/", (req, res, next) => {
    db.Book.findAll({
        include: [
            {
                model: db.UserBook,
                include: [
                    {
                        model: db.User
                    },
                    {
                        model: db.Exchange
                    }
                ]
            }
        ]
    }).then(books => {
        const counts = {};

        _.each(books, book => {
            counts[book.isbn] = book.UserBooks.length;
        });

        _.each(books, book => {
            _.each(book.UserBooks, userBook => {
                _.each(userBook.Exchanges, exchange => {
                    if (!exchange.endDate) {
                        counts[`${book.isbn}`] -= 1;
                    }
                });
            });
        });

        const availableBooks = _.filter(books, book => {
            let found = false;

            _.each(book.UserBooks, userBook => {
                if (userBook.User.id === req.user.id) {
                    found = true;
                }
            });

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

router.post("/", isLoggedIn, (req, res, next) => {
    db.Book.findOne({
        where: {
            isbn: req.body.isbn
        }
    }).then(book => {
        if (book) {
            db.UserBook.create({
                BookIsbn: book.isbn,
                UserId: req.user.id
            }).then(() => {
                res.end();
            })
              .catch(err => console.log(err));
        }
        db.Book.create(req.body).then(book => {
            return db.UserBook.create({
                BookIsbn: book.isbn,
                UserId: req.user.id
            });
        }).then(() => {
            res.end();
        })
          .catch(err => console.log(err));
    }).catch(err => console.log(err));

});

router.delete("/:bookId", isLoggedIn, (req, res, next) => {
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