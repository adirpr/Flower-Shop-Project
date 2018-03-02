var express = require('express');
var router = express.Router();

// contact page
router.get('/', function(req, res) {
    res.render('contact', { title: 'Contact', count: req.session.count });
});

module.exports = router;