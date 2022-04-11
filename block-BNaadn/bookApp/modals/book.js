var express = require('express')
var mongoose = require('mongoose')
var schema = mongoose.Schema;

var bookSchema = new schema({
    title : String ,
    summary :String ,
    pages : Number ,
    publication : String ,
    cover_image : String ,
    catageory : [String] ,
    authors : [{type :schema.Types.ObjectId , ref :'Author'}] ,
    catagarys : [{type : schema.Types.ObjectId ,ref :'Catagary'}]
} ,{timestamps : true})

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;