const passport = require("passport");
const db = require("../models");
const LocalStrategy = require("passport-local").Strategy;
const Helpers = require("../helpers/sqlhelper");
passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
   db.User.findOne(
       {
           where: {
               id: id
           }
       }
   ).then((user) => {
       done(null, user);
   }).catch((err) => {
       done(err, null);
   });
});

passport.use("local.signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, (req, email, password, done) => {
    req.checkBody("email", "Invalid email").notEmpty().isEmail();
    req.checkBody("password", "Invalid password").notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach((err) => {
            messages.push(err.msg);
        });
        return done(null, false, req.flash("error", messages));
    }
    db.User.findOne(
        {
            where: {
                email: email
            }
        }).then((user) => {
            if (user) {
                return done(null, false, {message: "User already exists."});
            }
            if (password !== req.body.password) {
                return done(null, false, {message: "Password is incorrect. Try again"});
            }
        var newUser = db.User.build({
           email: email,
           password: password,
           firstName: req.body.firstName,
           lastName: req.body.lastName
        });
        Helpers.hashPassword(password,(err, hash) => {
            if (err) {
                console.log(err);
            } else {
                newUser.password = hash;
                newUser.save().then((user) => {
                    return done(null, user);
                });
            }
        });
    }).catch((err) => {
        console.log(err);
    });
}));

passport.use("local.signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},(req, email, password, done) => {
    req.checkBody("email", "Invalid email").notEmpty().isEmail();
    req.checkBody("password", "Invalid password").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach((err) => {
            messages.push(err.msg);
        });
        return done(null, false, req.flash("error", messages));
    }
    db.User.findOne(
        {
            where: {
                email: email
            }
        }).then((user) => {
        if (!user) {
            return done(null, false, {message: "User doesn't exist."});
        }
        Helpers.validPassword(password, user.password, function(isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "Password is incorrect. Try again."
                });
            }
        });

    }).catch((err) => {
        done(err, null);
    });
}));