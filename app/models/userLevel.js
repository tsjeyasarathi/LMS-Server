/**
 * Level Schema
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userLevelSchema = new Schema({
        user_id             : String,
        course_id           : String,
        level               : Number,
        count               : Number,
        modified_at         : Date,
        created_at          : Date
});

module.exports = mongoose.model('LevelProgress', userLevelSchema);