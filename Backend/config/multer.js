const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary'); //cloudinary.js

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'farmer-tips',
        allowed_formats: ['jpg' , 'jpeg' , 'png' , 'webp' ],
    },
});

const upload = multer({
    storage : storage,
    limits: {fileSize: 10 * 1024 * 1024}, //10Mb max per image
});

module.exports = upload;