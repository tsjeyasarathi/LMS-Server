/**
 * User Schema
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   _id:String,
   email:String,
   last_name:String,
   first_nameone:String,
   token:String
});

module.exports = mongoose.model('users', userSchema); 