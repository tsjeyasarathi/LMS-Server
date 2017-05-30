/**
 * Count Schema
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resourceTrackingSchema = new Schema({
        user_id             : String,
        course_id           : String,
        level               : Number,
        step                : Number,
        resource_link       : String ,
        count               : Number,
        modified_at         : Date,
        created_at          : Date
});

module.exports = mongoose.model('resourceTracking', resourceTrackingSchema);