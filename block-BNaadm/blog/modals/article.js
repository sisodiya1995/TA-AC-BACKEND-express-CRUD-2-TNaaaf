var mongoose = require('mongoose');
var schema = mongoose.Schema;

var articleSchema = new schema({
    title : String ,
    description : String ,
    tag : [String] ,
    author : String ,
    likes : {type : Number ,default : 0}
})

var Article = mongoose.model('Article' ,articleSchema);
module.exports = Article ;