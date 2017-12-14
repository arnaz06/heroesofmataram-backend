let mongoose = require('mongoose');
let Schema = mongoose.Schema

let userSchema = new Schema({}, {
  strict: false,
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
