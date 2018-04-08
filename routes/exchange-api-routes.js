var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the exchanges
    app.get("/api/exchanges", function(req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Exchange
        db.Exchange.findAll({
            where: query
        }).then(function(dbExchange) {
            res.json(dbExchange);
        });
    });

    // Get route for retrieving a single Exchange
        app.get("/api/exchanges/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Exchange
        db.Exchange.findOne({
            where: {
            id: req.params.id
            }
        }).then(function(dbExchange) {
            res.json(dbExchange);
        });
    });

    // route for creating a new Exchange
    app.post("/api/exchanges", function(req, res) {
        db.Exchange.create(req.body).then(function(dbExchange) {
            res.json(dbExchange);
        });
    });

    // DELETE route for deleting exchanges
    app.delete("/api/exchanges/:id", function(req, res) {
        db.Exchange.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(dbExchange) {
            res.json(dbExchange);
        });
    });

    // PUT route for updating exchanges
    app.put("/api/exchanges", function(req, res) {
        db.Exchange.update(
            req.body,
            {
            where: {
                id: req.body.id
            }
            }).then(function(dbExchange) {
            res.json(dbExchange);
        });
    });
};