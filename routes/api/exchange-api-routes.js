const express = require("express");
const router = express.Router();
const _ = require("lodash");
const moment = require("moment");
const db = require("../../models");

router.get("/user", isLoggedIn, (req, res, next) => {
    db.Exchange.findAll({
        where: {
            UserId: req.user.id
        },
        include: {
            model: db.Book
        },
        order: [
            ["endDate", "ASC"],
            ["startDate", "DESC"]
        ]
    })
    .then(exchanges => {
        res.json(exchanges);
    })
    .catch(err => console.log(err));
});

router.get("/", (req, res, next) => {
    res.json([]);
});

router.post("/", isLoggedIn, (req, res, next) => {
    db.Exchange.create({
        ...req.body,
        UserId: req.user.id
    })
      .then(() => {
          res.end();
      })
      .catch(err => console.log(err));
});

router.put("/:exchangeId", isLoggedIn, (req, res, next) => {
    db.Exchange.update({
        endDate: moment.format()
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