var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
var Post = require('../models/Post')
const Handlebars = require('handlebars');
const moment = require('moment');
const methodOverride = require('method-override')


var app = express();
app.use(methodOverride('_method'))


// //functions for all posts
// function checkAuth(req, res, next) {
//   if (!req.session.userEmail) {
//     return res.status(401).send('Not authenticated');
//   }

//   next();
// }

// fetch all posts
async function getAllPosts() {
  const posts = await Post.find().sort({
    createdAt: 'desc'//sorts the posts in decending order 
  });
  return posts;
}

///Get request function for the getAllPosts function
router.get('/', async function (req, res, next) {
  const posts = await getAllPosts();
  res.render('index', { post: posts });
});


// Search posts
router.get('/search', async function (req, res, next) {
  let query = new RegExp(req.query.title, 'i'); // case insensitive
  const posts = await Post.find({ title: query }).sort({ createdAt: 'desc' });

  if (!posts.length) {
    return res.render('', { message: "No posts found with the given title.", post: [] });
  }
  res.render('index', { post: posts });
});


/* GET home page. */
router.get('/', function(req, res, next) {
 
  res.render('index', );
});

//mongo password amb75nd62rkAXoYF
module.exports = router;
