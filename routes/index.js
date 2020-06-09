const express = require('express');
const router = express.Router();
const passport = require('passport');

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


router.get('/', function (req, res) {
    res.render('landingPage');
});


// =============================================
// =            Auth Routes                    =

router.get("/register", (req, res) => {
    res.render("register");
});

router.post('/register', (req, res) => {
    let newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, createdUser) {
        if (err) {
            console.log(err);
            res.redirect('/register');
        }

        // register logic here
        passport.authenticate("local")(req, res, function () {
            res.redirect('/campgrounds');
        })

    });
});

router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {});


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/campgrounds');
});


module.exports = router;