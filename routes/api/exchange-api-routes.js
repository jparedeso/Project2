const express = require("express");
const router = express.Router();
const _ = require("lodash");
const moment = require("moment");
const db = require("../../models");

router.get("/user", isLoggedIn, (req, res, next) => {
    db.Exchange.findAll({
        where: {
            UserId: req.user.id,
            endDate: {
                $eq: null
            }
        },
        include: {
            model: db.UserBook,
            include: {
                model: db.Book
            }
        },
        order: [
            ["startDate", "DESC"]
        ]
    })
    .then(exchanges => {
        const data = [];
        _.each(exchanges, exchange => {
            data.push({
                id: exchange.id,
                isbn: exchange.UserBook.Book.isbn,
                title: exchange.UserBook.Book.title,
                author: exchange.UserBook.Book.author,
                year: exchange.UserBook.Book.year,
                category: exchange.UserBook.Book.category
            });
        });
        res.json(data);
    })
    .catch(err => console.log(err));
});

router.get("/", (req, res, next) => {
    res.json([]);
});

router.post("/", isLoggedIn, (req, res, next) => {
    db.Book.findOne({
        where: {
            isbn: req.body.BookIsbn
        },
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
    })
    .then(book => {
        const users = [];

        _.each(book.UserBooks, userBook => {
            let found = false;

            for (let i = 0; i < userBook.Exchanges.length && !found; i++) {
                const exchange = userBook.Exchanges[i];

                if (!exchange.endDate) {
                    // book is not available
                    found = true;
                }
            }

            if (!found) {
                users.push(userBook.UserId);
            }
        });

        const userBookId = _.filter(book.UserBooks, userBook => userBook.UserId === users[0])[0].id;

        return db.Exchange.create({
            UserBookId: userBookId,
            UserId: req.user.id
        })
    })
      .then(() => {
          res.end();
      })
      .catch(err => console.log(err));
});

router.put("/:exchangeId", isLoggedIn, (req, res, next) => {
    db.Exchange.update({
        endDate: moment().format()
    }, {
        where: {
            id: req.params.exchangeId
        }
    })
      .then(() => {
          res.end();
      })
      .catch(err => console.log(err));
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;