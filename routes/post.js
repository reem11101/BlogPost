//Require express and router
var express = require('express');
var router = express.Router();


//get request function for post page
router.get('/', function(req, res, next) {
  const articles = [{
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

 res.render('post', { articles: articles });
});

router.post('/', (req,res)=> {
 
});


//export Router
module.exports = router;