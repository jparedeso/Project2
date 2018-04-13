const passport = require("passport");
const db = require("../models");
const LocalStrategy = require("passport-local").Strategy;
const Helpers = require("../helpers/sqlhelper");
passport.serializeUser(function(user, done) {
   done(null, user.email);
});

passport.deserializeUser(function(email, done) {
   db.User.findOne(
       {
           where: {
               email: email
           }
       }
   ).then(function(user) {
       done(null, user);
   }).catch(function(err) {
       done(err, null);
   });
});

passport.use("local.signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody("email", "Invalid email").notEmpty().isEmail();
    req.checkBody("password", "Invalid password").notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(err) {
            messages.push(err.msg);
        });
        return done(null, false, req.flash("error", messages));
    }
    db.User.findOne(
        {
            where: {
                email: email
            }
        }).then(function(user) {
            if (user) {
                return done(null, false, {message: "User already exists."});
            }
            if (password !== req.body.password) {
                return done(null, false, {message: "Password is incorrect. Try again"});
            }
        var newUser = db.User.build({
           email: email,
           password: password
        });
        Helpers.hashPassword(password, function(err, hash) {
            if (err) {
                console.log(err);
            } else {
                newUser.password = hash;
                newUser.save().then(function (user) {
                    return done(null, user);
                });
            }
        });
    }).catch(function(err) {
        console.log(err);
    });
}));

passport.use("local.signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody("email", "Invalid email").notEmpty().isEmail();
    req.checkBody("password", "Invalid password").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(err) {
            messages.push(err.msg);
        });
        return done(null, false, req.flash("error", messages));
    }
    db.User.findOne(
        {
            where: {
                email: email
            }
        }).then(function(user) {
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

    }).catch(function(err) {
        done(err, null);
    });
}));