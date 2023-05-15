var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var bcrypt = require('bcrypt');


// render login page
router.get('/', function(req, res, next) {
  res.render('login');
});

// render register
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(!user){
    return res.status(400).send('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid email or password');
  }

  res.send('Logged in');
});

router.post('/register', async (req,res) => {
  const { name, username, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send('User already registered.');
  }

  user = new User({
    name,
    username, // added this
    email,
    password: await bcrypt.hash(password, 10)
  });

  await user.save();
  res.send('User registered');
});

module.exports = router;
