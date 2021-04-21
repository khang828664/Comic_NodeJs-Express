import express = require ("express")
import *as mongo from 'mongodb'
import *as ImageController from './controller/ImageController'
const router = express.Router();
import  *as multer from 'multer'
import *as middleware from './middleware/UploadImage'
// Get All User
const upload = multer()
router.post('/upload',ImageController.UploadImage)
router.get('/image', upload.any(),ImageController.GetImage)
router.get('/image/:name', ImageController.GetImageByName)
export default router