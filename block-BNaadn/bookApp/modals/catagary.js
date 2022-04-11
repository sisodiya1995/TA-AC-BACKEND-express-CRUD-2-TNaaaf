var express = require('express')
var mongoose = require('mongoose')
var schema = mongoose.Schema;

var catagarSchema = new schema({
    fiction : String ,
    adventure : String ,
    technology: String ,
    motivation : String
 
} ,{timestamps : true})

var Catagary = mongoose.model('Catagary' , catagarSchema);
module.exports = Catagary;