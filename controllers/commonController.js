const mongoose = require('mongoose')
const COMMON = mongoose.model('common')
const fs = require('fs');

exports.data = {
    addimage: async (req, res) => {
        try {
            const path = this.data.imagepath();
            const baseImage = req.body.image;
            if (!baseImage.startsWith('data:')) return res.json({
                alert: "base64 is not"
            });
            //Find extension of file
            const ext = baseImage.substring(baseImage.indexOf('/') + 1, baseImage.indexOf(';base64'));
            const fileType = baseImage.substring('data:'.length, baseImage.indexOf('/'));
            //Forming regex to extract base64 data of file.
            const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
            //Extract base64 data.
            const base64Data = baseImage.replace(regex, '');
            const filename = `${new Date().valueOf()}.${ext}`;
            fs.writeFileSync(path + filename, base64Data, 'base64');
            delete req.body.image;
            req.body.image = filename;
            const created = await COMMON.create(req.body);
            if (created) {
                return res.json({
                    success: true,
                    message: 'file uploaded successfully !'
                })
            } else {
                return res.json({
                    success: false,
                    message: 'failed to upload file !'
                })
            }
        } catch (err) {
            return res.json(err)
        }
    },
    addpdf: async (req, res) => {
        try {
            const path = this.data.pdfspath();
            const basePdf = req.body.pdf;
            if (!basePdf.startsWith('data:')) return res.json({
                alert: "base64 is not"
            });
            //Find extension of file
            const ext = basePdf.substring(basePdf.indexOf('/') + 1, basePdf.indexOf(';base64'));
            const fileType = basePdf.substring('data:'.length, basePdf.indexOf('/'));
            //Forming regex to extract base64 data of file.
            const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
            //Extract base64 data.
            const base64Data = basePdf.replace(regex, '');
            const filename = `${new Date().valueOf()}.${ext}`;
            fs.writeFileSync(path + filename, base64Data, 'base64');
            delete req.body.pdf;
            req.body.pdf = filename;
            const created = await COMMON.create(req.body);
            if (created) {
                return res.json({
                    success: true,
                    message: 'file uploaded successfully !'
                })
            } else {
                return res.json({
                    success: false,
                    message: 'failed to upload file !'
                })
            }
        } catch (err) {
            return res.json(err)
        }
    },
    getimage: async (req, res) => {
        try {
                const imageName = req.body.image
                const imgpath = this.data.imagepath()
                fs.readFile(`${imgpath}${imageName}`, 'base64', function(err, data){
                    if(err){
                        return res.json(err)
                    }else{
                        const result = "data:image/jpeg;base64,"+data
                        return res.json({
                            result:result
                        })
                    }
                })
        } catch (err) {
            return res.json(err)
        }
    },
    getpdf: async (req, res) => {
        try {
                const pdfName = req.body.pdf
                const pdfpath = this.data.pdfspath()
                fs.readFile(`${pdfpath}${pdfName}`, 'base64', function(err, data){
                    if(err){
                        return res.json(err)
                    }else{
                        const result = "data:application/pdf;base64,"+data
                        return res.json({
                            result:result
                        })
                    }
                })
        } catch (err) {
            return res.json(err)
        }
    },
    deleteimg: async (req,res) => {
        try {
            const imageName = req.body.image
            const imagePath = this.data.imagepath()
            if(imageName){
                fs.unlink(`${imagePath}${imageName}`,(err) => {
                    if(err) return res.json(err)
                    return res.json({
                        message:'file deleted successfully'
                    })
                })
            }
        } catch (err) {
            return res.json(err)
        }
    },
    deletepdf: async (req,res) => {
        try {
            const pdfName = req.body.pdf
            const pdfPath = this.data.pdfspath()
            if(pdfName){
                fs.unlink(`${pdfPath}${pdfName}`,(err) => {
                    if(err) return res.json(err)
                    return res.json({
                        message:'file deleted successfully'
                    })
                })
            }
            else{
                return res.json({
                    message:"please Enter pdf name "
                })
            }
        } catch (err) {
            return res.json(err)
        }
    },
    imagepath: function () {
        const basepath = __dirname;
        const splitdir = basepath.split("\\")
        splitdir.pop()
        const path = splitdir.join("/") + "/images/"
        return path
    },
    pdfspath: function () {
        const basepath = __dirname
        const splitdir = basepath.split('\\')
        splitdir.pop()
        const path = splitdir.join("/") + "/pdfs/"
        return path
    }
}