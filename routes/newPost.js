var express = require('express');
var Post = require('../models/Post')

var router = express.Router();

/* GET page. */
router.get('/', function (req, res, next) {
  res.render('newPost');
});

router.post('/', async (req, res) => {
  let post = new Post ({
    title: req.body.title,
    description: req.body.description
  })
  try {
    await post.save()
    res.redirect(`/post/${post.id}`) // changed from /articles/${post.id}
  } catch (e) {
    console.log(e)
    res.render('newPost', { post: post })
  }
})

// wildcard route at the end
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post == null) {
      console.log("Post is null, redirecting...")
      return res.redirect('/post')
    } else {
      res.render('post/show', { post : post })
    }
  } catch (e) {
    console.log("An error occurred, redirecting...")
    console.error(e)
    return res.redirect('post')
  }
})

// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id)
//     if (post == null) {
//       res.redirect('/post')
//     } else {
//       res.render('post/show', { post : post })
//     }
//   } catch (e) {
//     console.log(e)
//     res.redirect('/')
    
//   }


module.exports = router;
