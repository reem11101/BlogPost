//Require express and router
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')




//get request function for post page
router.get('/', function(req, res, next) {
  const post = [{
    title : 'Test Post',
    createdAt: new Date(),
    description: 'Test text'
  },
  {
    title : 'Test Post 2',
    createdAt: new Date(),
    description: 'Test text 2'
  }]
  //passing articles to veiw
 res.render('post', { post: post });
});

router.post('/', (req,res)=> {
 
});


//export Router
module.exports = router;