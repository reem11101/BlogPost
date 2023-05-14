var express = require('express');
var Posts = require('../models/post');
var router = express.Router();

/* GET page. */
router.get('/', function(req, res, next) {
  res.render('newPost');
});

router.post('/', (req,res) => {
const post = new Post({
})
})

module.exports = router;