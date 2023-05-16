var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var bcrypt = require('bcrypt');

// Render login page
router.get('/', function (req, res, next) {
  res.render('login');
});

// Render register page
router.get('/register', function (req, res, next) {
  res.render('register');
});

// Handle login request
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.render('post');
  }

  res.send('Logged in');
});


// Handle register request
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already registered');
    }

    user = new User({ username, email, password });
    await user.save();
    res.send('User registered');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
