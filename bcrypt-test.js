var bcrypt = require('bcrypt');

async function testBcrypt() {
  var password = 'myPassword123';  // replace with your password

  // hash the password
  var hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashedPassword);

  // compare the plaintext password with the hashed password
  var validPassword = await bcrypt.compare(password, hashedPassword);
  console.log('Password valid:', validPassword);  // should be true

  // compare a wrong password with the hashed password
  var wrongPassword = 'wrongPassword';
  var validPasswordWrong = await bcrypt.compare(wrongPassword, hashedPassword);
  console.log('Wrong password valid:', validPasswordWrong);  // should be false
}

testBcrypt();
