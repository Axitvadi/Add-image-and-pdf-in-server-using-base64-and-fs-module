const express = require('express')
const router = express.Router()
const commoncontroller = require("../controllers/commonController")

router.post('/uploadimage',commoncontroller.data.addimage)
router.post('/uploadpdf',commoncontroller.data.addpdf)
router.post('/getimage',commoncontroller.data.getimage)
router.post('/getpdf',commoncontroller.data.getpdf)
router.delete('/deleteimage',commoncontroller.data.deleteimg)
router.delete('/deletepdf',commoncontroller.data.deletepdf)

module.exports = router