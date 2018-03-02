var express = require('express');
var router = express.Router();

var branch = require('../models/branch');

// branchManagement page
router.get('/', function(req, res) {
    // Get all the branches
    branch.find({ active: true }, function(err, branches) {
        if (err) throw err;
        res.render('branchManagement', { title: 'branchManagement', count: req.session.count, branches: branches });
    });
});

module.exports = router;