// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const index = require("./routes/web/index");
const user = require("./routes/web/user");
const expressHbs = require("express-handlebars");
const session = require("express-session");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8081;

// Requiring our models for syncing
const db = require("./models");

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
app.use(session({secret: "bibliotecaboyz", resave: false, saveUninitialized: false}));
// Static directory to be served
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

app.use('/user', user);
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
