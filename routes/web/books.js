var express = require("express");
var router = express.Router();

/* GET postbook page. */

router.get('/postbooks', function(req, res, next) {
    res.render('books/postbooks', {title: 'Biblioteca Boyz'});
});

router.get('/mybooks', function(req, res, next) {
    res.render('books/mybooks', {title: 'Biblioteca Boyz'});
});

router.get('/books', function(req, res, next) {
    res.render('books/books', {title: 'Biblioteca Boyz'});
});

router.get('/search', function(req, res, next) {
    res.render('books/search', {title: 'Biblioteca Boyz'});
});


module.exports = router;