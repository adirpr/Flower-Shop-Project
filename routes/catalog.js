var express = require('express');
var router = express.Router();

var flower = require('../models/flower');

// catalog page
router.get('/', function(req, res) {
    // Get all the flowers
    flower.find({ active: true }, function(err, flowers) {
        if (err) throw err;

        res.render('catalog', { title: 'catalog', count: req.session.count, flowers: flowers });
    });
});

module.exports = router;