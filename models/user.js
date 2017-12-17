let mongoose = require('mongoose');
let Schema = mongoose.Schema
let mongoose_delete = require('mongoose-delete');

let userSchema = new Schema({}, {
  strict: false,
  timestamps: true
})
userSchema.plugin(mongoose_delete, { deletedAt : true })
module.exports = mongoose.model('User', userSchema)
