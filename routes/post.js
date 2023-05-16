//Require express and router
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
var Post = require('../models/Post')
var Users = require('../models/Users')
const methodOverride = require('method-override')
const session = require('express-session');




var app = express();
app.use(methodOverride('_method'))

//functions for all posts
        function checkAuth(req, res, next) {
          if (!req.session.userEmail) {
            return res.status(401).send('Not authenticated');
          }

          next();
        }
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



router.get('/', checkAuth, async (req, res) => {
  try {
    const posts = await Post.find({ userEmail: req.session.userEmail }).lean();
    console.log(posts);
    res.render('post', { posts, userEmail: req.session.userEmail });
  } catch (err) {
    console.log(err);
    res.send('Server error');
  }
});


// NEW ARTICLE ROUTES 
// router.post('/create', async (req, res) => {
router.post('/create', checkAuth, async (req, res) => {
  let post = new Post({
    title: req.body.title,
    description: req.body.description,
    userEmail: req.session.userEmail   // set the user field
  })
  try {
    post = await post.save()
    res.redirect(`/post/${post.id}`)
    return
  } catch (e) {
    console.log(e)
    res.render('/', { post: [] })
    return
  }
})

// route is for displaying user posts after login
router.get('/', checkAuth, async (req, res) => {

  try {
    const posts = await Post.find({ userEmail: req.session.userEmail })
    res.render('post', { userEmail: req.session.userEmail });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Server error');
  }
});


router.get('/edit/:id', checkAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.userEmail !== req.session.userEmail) {
      return res.status(403).send('Not authorized try different account');
    }
    res.render('edit', { post });
  } catch (e) {
    console.log("An error occurred");
    console.error(e);
    return res.redirect('/post');
  }
});
// Update post route
router.post('/:id', checkAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.userEmail !== req.session.userEmail) {
      return res.render('login');
    }

    post.title = req.body.title;
    post.description = req.body.description;
    await post.save();

    res.redirect(`/post/${post.id}`);
  } catch (e) {
    console.log("An error occurred");
    console.error(e);
    return res.redirect('/post');
  }
});



//Delete route
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post || post.userEmail !== req.session.userEmail) {
      return res.status(403).send('Not authorized');
    }
    res.redirect('/post');
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
//export Router
module.exports = router;