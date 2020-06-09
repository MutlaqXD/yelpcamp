const express = require('express');
const router = express.Router();


// models
var Campground = require("../models/Campground");


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


router.get('/new', function (req, res) {
    isLoginIn(req, res);
    res.render('addCampground');
});



//get
router.get('/', function (req, res) {
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


router.post('/', function (req, res) {
    isLoginIn(req, res);
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
router.get('/:id', function (req, res) {
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

module.exports = router;