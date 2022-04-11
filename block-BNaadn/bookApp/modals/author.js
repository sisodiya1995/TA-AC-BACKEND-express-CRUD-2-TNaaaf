var express = require('express')
var mongoose = require('mongoose')
var schema = mongoose.Schema;

var authorSchema = new schema({
    name : String ,
    email :String ,
    country: String ,
    bookId :{type :schema.Types.ObjectId ,ref :'book'}
} ,{timestamps : true})

var Author = mongoose.model('Author', authorSchema);
module.exports = Author;