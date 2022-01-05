import express = require("express")
import *as mongo from 'mongodb'
import *as ImageController from './controller/ImageController'
const router = express.Router();
import *as multer from 'multer'
import *as middleware from './middleware/UploadImage'
// Get All User
const upload = multer()
router.post('/upload', upload.single("files"), ImageController.UploadImage)
router.get('/image', upload.any(), ImageController.GetImage)
router.get('/image/:type/:name', ImageController.GetImageByName)
export default router