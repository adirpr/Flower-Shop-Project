var express = require('express');
var router = express.Router();

// chat page
router.get('/', function(req, res) {
    res.render('chat', { title: 'Chat', count: req.session.count });
});

module.exports = router;