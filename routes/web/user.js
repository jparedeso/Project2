const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

const csrfProtection = csrf();
router.use(csrfProtection);

router.get("/signup", function(req, res, next)  {
    let messages = req.flash("error");
    res.render("user/signup", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post("/signup", passport.authenticate("local.signup", {
    failureRedirect: "/user/signup",
    failureFlash: true
}), function(req, res, next) {
        if( req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect("/user/profile");
        }
    });

router.get("/profile", function(req, res, next) {
    res.render("user/profile");
});

module.exports = router;

// , function (req, res, next) {
//     if (req.session.oldUrl) {
//         var oldUrl = req.session.oldUrl;
//         req.session.oldUrl = null;
//         res.redirect(oldUrl);
//     } else {
//         res.redirect("/user/profile");
//     }
// }