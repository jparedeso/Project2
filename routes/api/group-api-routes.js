var db = require("../../models/index");

module.exports = function(app) {
    // find all groups route
    app.get("/api/groups", function(req, res) {
        // Here we add an "include" property to our options in our findAll query
        // set the value to an array of the models we want to include in a left outer join
        db.Group.findAll({
            include: [db.User]
        }).then(function(dbGroup) {
            res.json(dbGroup);
        });
    });

    // find one Group based on id route
    app.get("/api/groups/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // set the value to an array of the models we want to include in a left outer join
        db.Group.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function(dbGroup) {
            res.json(dbGroup);
        });
    });

    // create groups route
    app.post("/api/groups", function(req, res) {
        db.Group.create(req.body).then(function(dbGroup) {
            res.json(dbGroup);
        });
    });

    // PUT route for updating groups
    app.put("/api/groups", function(req, res) {
        db.Group.update(
            req.body,
            {
            where: {
                id: req.body.id
            }
            }).then(function(dbGroup) {
            res.json(dbGroup);
        });
    });

    // delete groups route
    app.delete("/api/groups/:id", function(req, res) {
        db.Group.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(dbGroup) {
            res.json(dbGroup);
        });
    });

};