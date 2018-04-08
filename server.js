// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory to be served
app.use(express.static("public"));


// Routes
// =============================================================
require("./routes/group-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/book-api-routes.js")(app);
require("./routes/exchange-api-routes.js")(app);
require("./routes/location-api-routes.js")(app);
// require("./routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================

// app.listen(PORT, function() {
//   console.log("App listening on PORT " + PORT);
// });

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
