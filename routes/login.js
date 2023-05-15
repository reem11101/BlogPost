var express = require('express');
var router = express.Router();
var require = ('../models/Users')


//render login page
router.get('/', function(req, res, next) {
  res.render('login', );
});

// render register
router.get('/register', function(req, res, next) {
  res.render('login', );
});

router.post('login', (req,res) =>{
  
})


module.exports = router;
