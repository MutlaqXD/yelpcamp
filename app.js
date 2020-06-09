const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// models
const user = require('./models/user');

const port = 3000;

//importing Models
var Campground = require("./models/Campground"),
    Comment = require("./models/Comment"),
    User = require("./models/user"),
    seedDB = require('./seeds');

app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs');

seedDB(); //we bring it from {seeds.js}





//database connection :
mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



//passport configuration
app.use(require('express-session')({
    secret: "HOLLLLLLAA from secret",
    resave: false,
    saveUninitialized: false
})); // we required the express-session

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// inject user information to every page
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});



// importing routers
var CampgroundsRoutes = require("./routes/Campgrounds");
var indexRoutes = require("./routes/index");

// using ext. routes
app.use("/campgrounds", CampgroundsRoutes);
app.use("/", indexRoutes);

function isLoginIn(req, res, next) {
    // this is first way:
    // if (req.user) {
    //     next();
    // } else {
    //     res.redirect('/login');
    // }

    // second way also:
    if (req.isAuthenticated()) {
        return next;
    } else {
        res.redirect('/login');
    }
}

// server
app.listen(port, function () {
    console.log(`The YelpCAMP server has been started at @ http://localhost:${port}`);

});