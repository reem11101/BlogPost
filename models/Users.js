const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

//USER SCHEMA FOR USER LOGIN
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  });


// Bcrypt not working revisit later:

// UserSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });


//export user schema
module.exports = mongoose.model("Users", UserSchema);