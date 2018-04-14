const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

const csrfProtection = csrf();
router.use(csrfProtection);

router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("user/profile");
});

router.get("/logout", isLoggedIn, (req,res, next) => {
    req.logout();
    res.redirect("/");
});

router.use("/", notLoggedIn, (req,res, next) => {
   next();
});

router.get("/signup", (req, res, next) =>  {
    let messages = req.flash("error");
    res.render("user/signup", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post("/signup", passport.authenticate("local.signup", {
    failureRedirect: "/user/signup",
    failureFlash: true
}), (req, res, next) => {
        if( req.session.oldUrl) {
            let oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect("/books/mybooks");
        }
    });

router.get("/signin", (req, res, next) => {
    let messages = req.flash("error");
    res.render("user/signin", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post("/signin", passport.authenticate("local.signin", {
    failureRedirect: "/user/signin",
    failureFlash: true
}), (req, res, next) => {
    if( req.session.oldUrl) {
        let oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect("/books/mybooks");
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;