var express = require('express');
var router = express.Router();

// home page
router.get('/', function(req, res) {
    if (req.session.count === undefined)
        req.session.count = 1;
    else
        req.session.count++;

    res.render('home', { title: 'Home', count: req.session.count });
});

module.exports = router;