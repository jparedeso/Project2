var express = require("express");
var router = express.Router();

/* GET postbook page. */

router.get('/', function(req, res, next) {
    res.render('groups/groups', {title: 'Biblioteca Boyz'});
});


module.exports = router;