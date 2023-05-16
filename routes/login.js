var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var Post = require('../models/Post');
var bcrypt = require('bcrypt');


// Render login page
router.get('/', function (req, res, next) {
  res.render('login');
});


// Handle login request
  router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || user.password !== password) {
      return res.render('login', { message: "Invalid email or password" });
      return res.status(400).send('Invalid email or password');
    }
    req.session.userEmail = user.email;
  
    res.render('post', { userEmail: req.session.userEmail });
  });
  
// Handle register request
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.render('login', { message: "User already registered" });
      // return res.status(400).send('User already registered');
    }

    user = new User({ username, email, password });
    await user.save();
    res.render('login',{ userEmail: req.session.userEmail });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
