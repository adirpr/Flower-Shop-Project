var express = require('express');
var router = express.Router();

var user = require('../models/user');

// userManagement page
router.get('/', function(req, res) {
    // Get the current user from the hidden query: ?userName=req.query.username
    user.findOne({ userName: req.query.userName }, function(err, user1) {
        if (user1 == null) {
            res.json('You must login in order to get access to user management');
            return;
        }

        currentUserOccupation = user1.occupation;

        // Get all the users
        user.find({ active: true }, function(err, users) {
            if (err) throw err;
            //console.log(users); // Object of all the users
            res.render('userManagement', { currentUserOccupation: currentUserOccupation, users: users });
        });
    });
});

module.exports = router;