const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // password optional for Google users
  googleId: { type: String }  // googleId for Google users
});
module.exports = mongoose.model('User', userSchema);