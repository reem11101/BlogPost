var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
var Post = require('../models/Post')
const Handlebars = require('handlebars');
const moment = require('moment');
const methodOverride = require('method-override')


var app = express();
app.use(methodOverride('_method'))


// GET ALL FETCH FUNCTION TO DISPLAY ALL USERS POSTS 
async function getAllPosts() {
  const posts = await Post.find().sort({
    createdAt: 'desc' //SORTS POSTS INTO DECENDING ORDER SO THE LATESTS ARE AT THE TOP
  });
  return posts;
}

///GET ROUTE FOR INDEX PAGE FOR THE getAllPosts function
router.get('/', async function (req, res, next) {
  const posts = await getAllPosts();
  res.render('index', { post: posts });
});


// SEARCH ROUTE FOR THE SEARCH FUNCTION ON INDEX PAGE
router.get('/search', async function (req, res, next) {
  let query = new RegExp(req.query.title, 'i'); // case insensitive
  const posts = await Post.find({ title: query }).sort({ createdAt: 'desc' });

  if (!posts.length) {
    return res.render('', { message: "No posts found with the given title.", post: [] });
  }
  res.render('index', { post: posts });
});

// INDEX GET ROUTE
router.get('/', function (req, res, next) {
  res.render('index',);
});

module.exports = router;
