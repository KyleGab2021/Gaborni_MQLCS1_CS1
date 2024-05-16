const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: String,
  firstname: String,
  lastname: String,
  address: String,
  about: String,
  username: String,
  password: String
})

const UserModel = mongoose.model("cs1Users", UserSchema)

module.exports = UserModel