var express = require('express');
var router = express.Router();

// about page
router.get('/', function(req, res) {
    res.render('about', { title: 'About', count: req.session.count });
});

module.exports = router;