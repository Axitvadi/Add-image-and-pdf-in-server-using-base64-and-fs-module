const express = require('express')
const router = express.Router()
const common = require("./common")

router.use('/common',common)

module.exports = router