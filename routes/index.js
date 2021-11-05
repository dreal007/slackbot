const express = require('express');
const router = express.Router();
const api = require('./api');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ title: 'Express API' });
});

router.use('/api', api);

module.exports = router;
