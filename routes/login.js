// var express = require('express');
// var router = express.Router();
// var User = require('../models/Users');
// var bcrypt = require('bcrypt');

// var app = express();
// app.use(express.urlencoded({extended: false}))

// // render login page
// router.get('/', function (req, res, next) {
//   res.render('login');
// });

// // render register
// router.get('/register', function (req, res, next) {
//   res.render('register');
// });

// router.post('/login', async (req,res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if(!user){
//     return res.status(400).send('Invalid email or password');
//   }

//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) {
//     return res.status(400).send('Invalid email or password');
//   }

//   res.send('Logged in');
// });

// router.post('/register', async (req, res) => {
//   const { name, username, email, password } = req.body;

//   let user = await User.findOne({ email });
//   if (user) {
//     return res.status(400).send('User already registered.');
//   }

//   user = new User({
//     name,
//     username, // added this
//     email,
//     password: await bcrypt.hash(password, 10)
//   });

//   await user.save();
//   res.send('User registered');
//   console.log(user)
// });

// module.exports = router;
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
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid email or password');
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
