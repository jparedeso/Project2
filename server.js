// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const index = require("./routes/web/index");
const user = require("./routes/web/user");
const books = require("./routes/web/books");
const groups = require("./routes/web/groups");
const expressHbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const validator = require("express-validator");

// Sets up the Express App
// =============================================================
const app = express();
require("./config/passport");
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
app.use(validator());
app.use(session({secret: "bibliotecaboyz", resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Static directory to be served
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

app.use('/user', user);
app.use('/', index);
app.use('/books', books);
app.use('/groups', groups);


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

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
