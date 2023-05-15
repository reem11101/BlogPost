//Require express and router
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
var Post = require('../models/Post')
const Handlebars = require('handlebars');
const moment = require('moment');
const methodOverride = require('method-override')

// Handlebars.registerHelper('formatDate', function(date) {
//   return moment(date).format('MMMM Do, YYYY');
// });

var app = express();
app.use(methodOverride('_method'))

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
  res.render('post', { post: posts });
});

// Search posts
router.get('/search', async function (req, res, next) {
  let query = new RegExp(req.query.title, 'i'); // case insensitive
  const posts = await Post.find({ title: query }).sort({ createdAt: 'desc' });

  if (!posts.length) {
    return res.render('post', { message: "No posts found with the given title.", post: [] });
  }



  res.render('post', { post: posts });
});


// NEW ARTICLE ROUTES 
router.post('/create', async (req, res) => {
  let post = new Post({
    title: req.body.title,
    description: req.body.description
  })
  try {
    post = await post.save()
    res.redirect(`/post/${post.id}`)
    return
  } catch (e) {
    console.log(e)
    res.render('post', { post: [] })
    return
  }
})

// Edit post route
router.get('/edit/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log("Post not found");
      return res.redirect('/post');
    }
    res.render('edit', { post });
  } catch (e) {
    console.log("An error occurred");
    console.error(e);
    return res.redirect('/post');
  }
});

// Update post route
router.post('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    if (!post) {
      console.log("Post not found");
      return res.redirect('/post');
    }
    res.redirect(`/post/${post.id}`);
  } catch (e) {
    console.log("An error occurred");
    console.error(e);
    return res.redirect('/post');
  }
});


// ID WILDCARD ROUTES
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post == null) {
      return res.redirect('/', { post: post })
    } else {
      res.render('show', { post: post })
    }
  } catch (e) {
    console.log("An error occurred")
    console.error(e)
    return res.redirect('/')
  }
});

//Delete route

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      console.log("Post not found");
      return res.redirect('/post');
    }
    res.redirect('/post');
  } catch (e) {
    console.log("An error occurred");
    console.error(e);
    return res.redirect('/post');
  }
});

// router.delete('/:id', async (req, res) => {
//   try {
//     await Post.findById(req.params.id);
//     await this.post.delete();
//     res.redirect('post');
//   } catch (e) {
//     console.log("An error occurred");
//     console.error(e);
//     return res.redirect('post');
//   }
// });


//export Router
module.exports = router;