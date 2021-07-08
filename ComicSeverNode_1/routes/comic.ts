
import express = require("express")
// import *as mongo from 'mongodb'
// import bodyParser = require("body-parser")
import *as comicController from './controller/ComicController'
import multer = require("multer");
const router = express.Router();
const jsonConfig = express.json()
const upload = multer()
// Get All User
router.get('/all', comicController.GetAllComic)
// router.get('/by/desname', upload.any(), jsonConfig, comicController.GetComicByName)
// get comic by name des or tag
router.get('/by/condition', jsonConfig, comicController.GetComicByCondition)
router.get('/user/', comicController.GetComicByIdUser)
router.get('/:_id', comicController.GetById)
router.post('/create', jsonConfig, comicController.CreateComic)
router.post('/update', jsonConfig, upload.any(), comicController.UpdateComic)
router.post('/delete', jsonConfig, comicController.DeleteComic)
router.post('/delete/hard', jsonConfig, comicController.HardDeleteComic)
router.post('/upload/cover', jsonConfig, comicController.UploadCover)
router.get('/mostview', jsonConfig, comicController.GetComicByCondition)
router.get('/get/:start/:end/', jsonConfig, comicController.GetLimit)
router.post('/search/name', jsonConfig, upload.any(), comicController.SearchComic)
router.post('/search/author', jsonConfig, upload.any(), comicController.SearchComicAuthor)
router.post('/bookmark/:_id/:idUser', jsonConfig, comicController.Bookmark)
router.post('/like/:_idUser/:_idComic/:status', jsonConfig, comicController.Like)
router.post('/get/bookmark/:_idUser', jsonConfig, comicController.GetBookmark)
// router.post('/date/update', comicController.UpdateDate)
export default router;