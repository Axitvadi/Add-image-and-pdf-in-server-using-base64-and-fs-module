require('dotenv').config();
const express = require('express')
const bodyparser = require('body-parser');
const app = express();
require("./config/db")
const router = require("./routes/index")

app.use(bodyparser.json({limit:'1024mb'}))
app.use(bodyparser.urlencoded({limit:'1024mb',extended:false}))

app.use(router)

const port = process.env.PORT || 4000
app.listen(port, ()=>{console.log(`server successfully started at port ${port} !`)})
