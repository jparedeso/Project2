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
const path = require("path");
const cookieParser = require("cookie-parser");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up the Express App
// =============================================================
const app = express();
require("./config/passport");
const PORT = process.env.PORT || 8081;

// Requiring our models for syncing
const db = require("./models");
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    checkExpirationInterval: 15 * 60 * 1000, //15 minutes
    expiration: 24 * 60 * 60 * 1000 // 24 hours
});

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
app.use(cookieParser());
app.use(session(
        {
            secret: "bibliotecaboyz",
            resave: false,
            saveUninitialized: false,
            store: sessionStore
        }
    ));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Static directory to be served
app.use(express.static(path.join(__dirname, 'public')));
sessionStore.sync();
app.use((req, res, next) => {
   res.locals.login = req.isAuthenticated();
   res.locals.session = req.session;
   next();
});

const booksApi = require("./routes/api/book-api-routes");
const exchangesApi = require("./routes/api/exchange-api-routes");

app.use('/api/books', booksApi);
app.use('/api/exchanges', exchangesApi);
app.use('/books', books);
app.use('/groups', groups);
app.use('/user', user);
app.use('/', index);

// Routes
// =============================================================
// require("./routes/api/group-api-routes.js")(app);
// require("./routes/api/user-api-routes.js")(app);
// require("./routes/api/book-api-routes.js")(app);
// require("./routes/api/exchange-api-routes.js")(app);
// require("./routes/api/location-api-routes.js")(app);

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
