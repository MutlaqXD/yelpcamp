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




app.get('/', function (req, res) {
    res.render('landingPage');
});


app.get('/campgrounds/new', function (req, res) {
    res.render('addCampground');
});


//get 
app.get('/campgrounds', function (req, res) {

    Campground.find({}, function (error, campgrounds) {
        // first always check for an error.
        if (error) {
            console.log(error);
        } else {
            // sending the {} => campgrounds paramter.
            res.render('campgrounds', {
                campgrounds: campgrounds
            });
        }
    })

});


app.post('/campgrounds', function (req, res) {
    //receive a send parameters
    let name = req.body.name;
    let image = req.body.image;
    // creating an object from it.
    //var currentObject = {name:name,image:image};
    Campground.create({
        name: name,
        image: image
    }, function (error, camp) {
        if (error) {
            res.send("Sorry, there's an error!");
        } else {
            res.redirect('/campgrounds');
        }
    });
});


// show campground by name
app.get('/campgrounds/:id', function (req, res) {
    let id = req.params.id;
    Campground.findById(id).populate('comments').exec(function (error, foundCampground) {
        if (error) {
            res.send("Sorry, N0T FOUND!");
        } else {
            res.render('show', {
                campground: foundCampground
            });
            // res.send('hello'+id);
        }
    });
});






// server 
app.listen(port, function () {
    console.log(`The YelpCAMP server has been started at @ http://localhost:${port}`);

});