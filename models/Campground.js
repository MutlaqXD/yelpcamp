const mongoose = require('mongoose');

// creating a schema for campgrounds .
var campgroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Campground", campgroundsSchema);