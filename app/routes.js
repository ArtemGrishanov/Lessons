// app/routes.js

// load up the user model
var User = require('../app/models/user');

module.exports = function(app, passport, properties, courses) {

    var ejs = require('ejs'),
        fs = require('fs');

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        var p = getResParams(req, properties);
        res.render('index.ejs', p);
    });
    app.get('/index', function(req, res) {
        var p = getResParams(req, properties);
        res.render('index.ejs', p);
    });

    // =====================================
    // COMPANY PAGE
    // =====================================
//    app.get('/company', function(req, res) {
//        res.render('company.ejs', {
//            pages: properties.pages,
//            properties: properties
//        });
//    });

    // =====================================
    // CONTACTS PAGE
    // =====================================
    app.get('/contacts', function(req, res) {
        var p = getResParams(req, properties);
        res.render('contacts.ejs', p);
    });

    // =====================================
    // LESSON PAGE
    // =====================================
    app.get('/lesson', function(req, res) {
        var p = getResParams(req, properties);
        res.render('lesson.ejs', p);
    });

    // =====================================
    // SERVICES PAGE
    // =====================================
    app.get('/services', function(req, res) {
        var p = getResParams(req, properties);
        res.render('services.ejs', p);
    });

    // =====================================
    // BLOG PAGE
    // =====================================
//    app.get('/blog', function(req, res) {
//        res.render('blog.ejs', {
//            pages: properties.pages,
//            properties: properties
//        });
//    });


    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        var p = getResParams(req, properties);
        p.message = req.flash('loginMessage');
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', p);
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages
        pages: properties.pages,
        properties: properties
    }));

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        var p = getResParams(req, properties);
        p.message = req.flash('signupMessage');

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', p);
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
//        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages
        pages: properties.pages,
        properties: properties

    }), function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        if (req.body.subscribe) {
            subscribe(req.user, req.body.subscribe, res, properties);
        }
        else {
            res.redirect('/profile');
        }
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', function(req, res) {
        if (req.isAuthenticated()) {
            var p = getResParams(req, properties);
            p.userCourses = getUserCourses(req, courses);
            res.render('profile.ejs', p);
        }
        else {
            res.redirect('/login');
        }
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // COURCES INTRO =======================
    // =====================================
    for (var key in courses) {
        console.log('key: ' + key);
        app.get('/courses/' + key, function(req, res) {

            var localKey = '';
            for (var key in courses) {
                if (req.originalUrl.indexOf(key) >= 0) {
                    localKey = key;
                    break;
                }
            }

            if (localKey) {
                courses[localKey].link = localKey;

                var content = ejs.render(fs.readFileSync('views/partials/course/intro/' + courses[localKey].link + '.ejs', "utf-8"), {
                    properties: properties
                });

                console.log('link: ' + courses[localKey].link);
                var p = getResParams(req, properties);
                p.course = courses[localKey];
                p.content = content;
                res.render('course_intro.ejs', p);
            }
        });
    }

    // process the subscribe
    app.post('/subscribe', function(req, res) {
        if (req.isAuthenticated()) {
            subscribe(req.user, req.body.course);
        }
        else {
            res.redirect('/signup?subscribe=' + req.body.course);
        }
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function subscribe(user, course, res, properties) {
    //save to db
    User.findOne({ 'local.email' :  user.local.email }, function(err, user) {
        if (err) {

        }
        else {
            if (user) {
                user.courses[course].active = true;
                user.save(function(err) {
                    res.render('thanks.ejs', {
                        pages: properties.pages,
                        properties: properties
                    });
                });
            } else {

            }
        }
    });
}

function getResParams(req, properties) {
    return {
        isLoggedIn: req.isAuthenticated(),
        user : req.user, // get the user out of session and pass to template
        pages: properties.pages,
        properties: properties
    };
}

function getUserCourses(req, courses) {
    var result = {};
    if (req.user) {
        for (var key in courses) {
            if (courses.hasOwnProperty(key)) {
                if (req.user.courses.hasOwnProperty(key) &&
                    req.user.courses[key].active == 'true') {
                    result[key] = courses[key];
                }
            }
        }
    }
    return result;
}