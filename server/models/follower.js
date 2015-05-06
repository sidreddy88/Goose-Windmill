var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var FollowerSchema = new Schema({
    userName : String, 
    author : String, 
});

mongoose.model('Follower', FollowerSchema);