var mongoose = require('mongoose');
var schema = mongoose.Schema;

var commentSchema = new schema({
    content: String ,
    articleId : {type :schema.Types.ObjectId ,ref :"article"} ,
    author : String ,
    likes : {type : Number ,default : 0}
})

var Comment = mongoose.model('Comment' , commentSchema);
module.exports = Comment;