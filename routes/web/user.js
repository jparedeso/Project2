const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', function(req, res, next)  {
    res.render('user/signup', {csrfToken: req.csrfToken()})
});

router.post('/signup', function(req, res, next) {

});

module.exports = router;