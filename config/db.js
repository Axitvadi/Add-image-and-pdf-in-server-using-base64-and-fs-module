const mongoose = require('mongoose')
require("../models/commonSchema")

mongoose.Promise = global.Promise

mongoose.connect(process.env.URL)

let db = mongoose.connection

db.once('open',()=>{console.log('database successfully connected to local database !')})