const bcrypt = require("bcrypt-nodejs");

module.exports = {
    hashPassword: (password, cb) => {
        bcrypt.hash(password, bcrypt.genSaltSync(5), null, (err, hash) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, hash);
            }
        });
    },
    validPassword: (password, passwd, cb) => {
        bcrypt.compare(password, passwd, (err, isMatch) => {
            if (err) console.log(err);
            cb(isMatch);
        });
    }
};