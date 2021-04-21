import express = require ("express")
import *as mongo from 'mongodb'
import *as ChapterController from './controller/ChapterController'
const router = express.Router();
const jsonConfig = express.json();
import  *as multer from 'multer'
import *as middleware from './middleware/UploadImage'
import { ComicServices } from "../Db";
// Get All User
const upload = multer()
router.post('/create',ChapterController.CreateChapter)
router.post('/Update',ChapterController.UpdateChapter)
router.get('/all',ChapterController.GetChapterAll)
router.get('/:_id',ChapterController.GetChapterById)
router.get('/image/delete/:_id',ChapterController.DeleteImage)
// router.post('/update/',ChapterController.UpdateChapter)
// router.get ('/delete/:_id',ChapterController.DeleteChapter)
export default router