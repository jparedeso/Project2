// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var index = require("./routes/web/index")
var expressHbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

//engine setup
app.engine('.hbs', expressHbs({
    defaultLayout: "layout",
    extname: ".hbs"
}));
app.set("view engine", "hbs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory to be served
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use('/', index);

// Routes
// =============================================================
require("./routes/api/group-api-routes.js")(app);
require("./routes/api/user-api-routes.js")(app);
require("./routes/api/book-api-routes.js")(app);
require("./routes/api/exchange-api-routes.js")(app);
require("./routes/api/location-api-routes.js")(app);

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
