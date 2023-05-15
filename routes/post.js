// //Require express and router


// var express = require('express');
// var router = express.Router();
// const mongoose = require('mongoose')
// var Post = require('../models/Post')


// //get request function sample data
// router.get('/', function(req, res, next) {
//   const post = [{
//     title : 'Test Post',
//     createdAt: new Date(),
//     description: 'Test text'
//   },
//   {
//     title : 'Test Post 2',
//     createdAt: new Date(),
//     description: 'Test text 2'
//   }]
//   //passing articles to veiw
//  res.render('post', { post: post });
// });

// // NEW ARTICLE ROUTES 
// router.post('/new', async (req, res) => {
//   let post = new Post ({
//     title: req.body.title,
//     description: req.body.description
//   })
//   try {
//     post = await post.save()
//     res.redirect(`post/${post.id}`) 
//   } catch (e) {
//     console.log(e)
//     res.render('post', {})
//   }
// })

// // ID WILDCARD ROUTES

// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id)
//     if (post == null) {
//       console.log("Post is null")
//       return res.redirect('/')
//     } else {
//       res.render('show', { post : post })
//     }
//   } catch (e) {
//     console.log("An error occurred")
//     console.error(e)
//     return res.redirect('/')
//   }
// });


// //export Router
// module.exports = router;

//Require express and router
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
var Post = require('../models/Post')

// This function could be used to fetch all posts
async function getAllPosts() {
  // Add your logic to fetch all posts from the database
  // This is just a placeholder
  const posts = await Post.find();
  return posts;
}

//get request function
router.get('/', async function(req, res, next) {
  const posts = await getAllPosts();
  res.render('post', { post: posts });
});

router.post('/create', async (req, res) => {
  let post = new Post ({
    title: req.body.title,
    description: req.body.description
  })
  try {
    post = await post.save();
    const posts = await getAllPosts();
    res.render('post', { post: posts });
  } catch (e) {
    console.log(e)
    const posts = await getAllPosts();
    res.render('post', { post: posts });
  }
});

// wildcard route at the end
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post == null) {
      console.log("Post is null")
      return res.redirect('/')
    } else {
      res.render('show', { post : post })
    }
  } catch (e) {
    console.log("An error occurred")
    console.error(e)
    return res.redirect('/')
  }
});

//export Router
module.exports = router;
