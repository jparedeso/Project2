var db = require("../../models/index");

module.exports = function(app) {
    // find all users route
    app.get("/api/users", function(req, res) {
        var query = {};
        if (req.query.group_id) {
          query.GroupId = req.query.group_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // set the value to an array of the models we want to include in a left outer join
        // trying to include info of books and group for user
        db.User.findAll({
            where: query,
            include: [db.Book],
            include: [db.Group]            
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // find one user based on id route
    app.get("/api/users/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // set the value to an array of the models we want to include in a left outer join
        // trying to include books and group for user
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Book],
            include: [db.Group]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // create users route
    app.post("/api/users", function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // PUT route for updating users
    app.put("/api/users", function(req, res) {
        db.User.update(
            req.body,
            {
            where: {
                id: req.body.id
            }
            }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // delete users route
    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

};