var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var Post = require('../models/Post');
var bcrypt = require('bcrypt');


// GET ROUTE
router.get('/', function (req, res, next) {
  res.render('login');
});


// LOGIN POST ROUTE
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //ERROR MESSAGE
  if (!user || user.password !== password) {
    return res.render('login', { message: "Invalid email or password" });
    return res.status(400).send('Invalid email or password');
  }
  req.session.userEmail = user.email;

  res.render('post', { userEmail: req.session.userEmail });
});

// REGISTER POST ROUTE
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      //ERROR MESSAGE
      return res.render('login', { message: "User already registered" });
    }

    user = new User({ username, email, password });
    await user.save();
    //ERROR MESSAGE
    res.render('login', { userEmail: req.session.userEmail });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
