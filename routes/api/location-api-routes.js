var db = require("../../models/index");

module.exports = function(app) {

    // GET route for getting all of the locations
    app.get("/api/locations", function(req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Location
        db.Location.findAll({
            where: query
        }).then(function(dbLocation) {
            res.json(dbLocation);
        });
    });

    // Get route for retrieving a single Location
        app.get("/api/locations/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Location
        db.Location.findOne({
            where: {
            id: req.params.id
            }
        }).then(function(dbLocation) {
            res.json(dbLocation);
        });
    });

    // route for creating a new Location
    app.post("/api/locations", function(req, res) {
        db.Location.create(req.body).then(function(dbLocation) {
            res.json(dbLocation);
        });
    });

    // DELETE route for deleting locations
    app.delete("/api/locations/:id", function(req, res) {
        db.Location.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(dbLocation) {
            res.json(dbLocation);
        });
    });

    // PUT route for updating locations
    app.put("/api/locations", function(req, res) {
        db.Location.update(
            req.body,
            {
            where: {
                id: req.body.id
            }
            }).then(function(dbLocation) {
            res.json(dbLocation);
        });
    });
};