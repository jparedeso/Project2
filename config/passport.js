const passport = require("passport");
const db = require("../models");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function(user, done) {
   done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   db.User.findOne(
       {
           where: {
               id: id
           }
       }
   ).then(function(user) {
       done(null, user);
   }).catch(function(err) {
       done(err, null);
   });
});