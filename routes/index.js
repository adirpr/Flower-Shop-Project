var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var debug = require('debug')('sess:index');

var user = require('../models/user');

var multer = require('multer');
var upload = multer({ dest: 'public/images/' });

var captchapng = require('captchapng');
var num;
var captchaImg = function() {
    num = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(80, 30, num); // width,height,numeric captcha

    p.color(115, 95, 197, 100); // First color: background (red, green, blue, alpha)
    p.color(30, 104, 21, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    return imgbase64;
}

// index page
router.get('/', function(req, res, next) {
    debug('requested');

    if (req.session.count === undefined)
        req.session.count = 1;
    // else
    //     req.session.count++;

    var valicode = new Buffer(captchaImg()).toString('base64');

    res.render('index', { title: 'Flower Shop', count: req.session.count, 'valicode': valicode });
});

// post method after login
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure',
        failureFlash: true
    })
);

router.get('/loginFailure', function(req, res, next) {
    res.json('Failed to authenticate');
});

router.get('/loginSuccess', function(req, res, next) {
    var occupation = req.session.occupation

    if (occupation == 'Manager')
        res.json('Logged in as manager');
    else if (occupation == 'Employee')
        res.json('Logged in as employee');
    else if (occupation == 'Client')
        res.json('Logged in as client');
    else
        res.json('Logged in as supplier');
});

passport.use('local', new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, userName, password, done) {
        user.getUserByUsername(userName, function(err, user1) {

            if (err) throw err;
            if (!user1)
                return done(null, false, { message: 'Unknown User' });

            var captcha = req.body.captcha;

            if (num != captcha)
                return done(null, false, { message: 'Wrong Captcha.\nPlease try again.' });

            user.comparePassword(password, user1.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    console.log(user1.userName);
                    // req.session.user = user.userName;
                    req.session.occupation = user1.occupation;
                    return done(null, user1);
                } else {
                    return done(null, false);
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    user.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.get('/logout', function(req, res, next) {
    debug('logging out');

    // TODO!!!!!!!!!!!
    // var valicode = new Buffer(captchaImg()).toString('base64');

    // TODO!!!!!!!!!!!
    res.render('home', { title: 'Home', count: req.session.count });
});

/*
// userManagement page
router.get('/userManagement', function(req, res) {
    // Get the current user from the hidden query: ?userName=req.query.username
    user.findOne({ userName: req.query.userName }, function(err, user1) {
        currentUserOccupation = user1.occupation;

        // Get all the users
        user.find({ active: true }, function(err, users) {
            if (err) throw err;
            //console.log(users); // Object of all the users
            res.render('userManagement', { currentUserOccupation: currentUserOccupation, users: users });
        });
    });
});
*/
// post method after adding a client
router.post('/addClient', function(req, res) {
    user.findOne({ id: req.body.id }, function(err, user1) {
        if (err) throw err;
        else if (user1 != null) res.json('This id is already taken!');
        else {
            user({
                id: req.body.id,
                userName: req.body.userName,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                active: true,
                occupation: 'Client',
                age: req.body.age,
                branchNumber: req.body.branchNumber
            }).save(function(err) {
                if (err) throw err;
                console.log('User created!');
                res.json('Added client successfully');
            });
        }
    });
});

// post method after adding a client
router.post('/addEmployee', function(req, res) {
    user.findOne({ id: req.body.id }, function(err, user) {
        if (err) throw err;
        else if (user != null) res.json('This id is already taken!');
        else {
            user({
                id: req.body.id,
                userName: req.body.userName,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                active: true,
                occupation: 'Employee',
                branchNumber: req.body.branchNumber,
                age: req.body.age
            }).save(function(err) {
                if (err) throw err;
                console.log('Employee created!');
                res.json('Added employee successfully');
            });
        }
    });
});

// post method after updating a user
router.post('/updateUser', function(req, res) {
    user.findOne({ userName: req.body.userName }, function(err, user) {
        if (err) console.log(err);
        else if (user == null) return;
        else {
            // Change the user
            user.username = req.body.userNameame;
            // user.password = req.body.password; // TODO!!!!!!!!!!
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.occupation = req.body.occupation;
            user.branchNumber = req.body.branchNumber;
            user.age = req.body.age;

            // Save the user
            user.save(function(err) {
                if (err) throw err;
                res.json('Updated user successfully');
            });
        }
    });
});

// post method after deleting a user
router.post('/deleteUser', function(req, res) {
    var userName = req.body.userName;

    user.findOne({ userName: userName }, function(err, user) {
        if (err) throw err;
        else if (user == null) {
            res.json('Error deleting this user');
            //return;
        }

        user.active = false;

        user.save(function(err) {
            if (err) throw err;

            res.json('Deleted user successfully');
        });
    });
});

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'flowershopjct@gmail.com',
        pass: 'flower123shop'
    }
});

router.post('/sendemail', function(req, res) {
    var mailOptions = {
        from: 'flowershopjct@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Message Recieved', // Subject line
        text: 'Your message has been recieved and will be taken care of.', // plain text body
        html: '<h1>Your message has been recieved and will be taken care of.</h1>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.json(response.response);
        } else {
            console.log('Message %s sent: %s', response.messageId, response.response);
            res.json('Confarmtaion message sent to ' + mailOptions.to);
        }
        transporter.close();
    });
});

module.exports = router;