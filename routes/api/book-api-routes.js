const db = require("../../models");

module.exports = function(app) {

    // GET route for getting all of the books
    app.get("/api/books", function(req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Book
        db.Book.findAll({
            where: query,
            include: [db.User]
        }).then(function(dbBook) {
            res.json(dbBook);
        });
    });

    // GET route for getting current User's books
    app.get("/api/user-books", function(req, res) {
        db.Book.findAll({
            where: {
                UserId: req.user.id
            },
            include: [db.User]
        }).then(function(dbBook) {
            res.json(dbBook);
        });
    });

    // Get route for retrieving a single Book
        app.get("/api/books/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        db.Book.findOne({
            where: {
            id: req.params.id
            },
            include: [db.User]
        }).then(function(dbBook) {
            res.json(dbBook);
        });
    });

    // route for creating a new Book
    app.post("/api/books", function(req, res, next) {
        db.Book.create(
            {
                ...req.body,
                UserId: req.user.id
            }).then(function(dbBook) {
            res.json(dbBook);
        });
    });

    // PUT route for updating books
    app.put("/api/user-books", function(req, res) {
        db.Book.update(
            req.body,
            {
            where: {
                id: req.body.id
            }
            }).then(function(dbBook) {
            res.json(dbBook);
        });
    });

    // DELETE route for deleting books
    app.delete("/api/user-books/:id", function(req, res) {
        db.Book.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(dbBook) {
            res.json(dbBook);
        });
    });

};
