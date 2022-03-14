"use strict"
let mongoose = require('mongoose')

let commonSchema = new mongoose.Schema({
    image:{
        type:String
    },
    pdf:{
        type:String
    }
},
{
    timestamps:true
})

let common = mongoose.model('common',commonSchema)
module.exports = common