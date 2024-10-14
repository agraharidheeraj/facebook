const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINART_NAME,
    api_key: process.env.CLOUDINART_API_KEY,
    api_secret: process.env.CLOUDINART_API_SECRET,
})

const uploadFileToCloudinary = (file) =>{
    const options = {
        resource_type:  file.mimetype.startsWith('video') ? 'video' : 'image'
    }


    return new Promise((resolve, reject) =>{
        //for video update 
        if(file.mimetype.startsWith('video')){
            cloudinary.uploader.upload_large(file.path,options,(error,result) =>{
                if(error){
                    return reject(error);
                }
                resolve(result)
            })
        }else{
            //image upload
            cloudinary.uploader.upload(file.path,options,(error,result) =>{
                if(error){
                    return reject(error);
                }
                resolve(result)
            })
        }
    })
}

const multerMiddleware = multer({dest : "uploads/"})

module.exports= {multerMiddleware,uploadFileToCloudinary}
