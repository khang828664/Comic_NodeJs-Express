
import express = require("express")
import *as userController from './controller/UserController'
import *as multer from 'multer'
const router = express.Router();
const jsonConfig = express.json();
const upload = multer()
// Get All User
router.get('/all', userController.GetAllUser)
router.get('/by/username', jsonConfig, userController.GetUserByUserName)
router.get('/by/condition', jsonConfig, userController.GetUserByCondition)
router.post('/create', jsonConfig, upload.any(), userController.CreateUser)
router.post('/update', jsonConfig, userController.UpdateUser)
router.post('/delete', jsonConfig, userController.DeleteUser)
router.post('/login', jsonConfig, upload.any(), userController.Login)
router.post('/upload/ava', userController.uploadAvatar)
router.post('/upload/cover', userController.uploadCover)
router.post('/comic/id', jsonConfig,upload.any(), userController.GetComicByIdUser)
router.post('/username/change', jsonConfig, userController.UpdatePassword)
router.post('/post/comment', jsonConfig, userController.PostComment)
router.get('/', jsonConfig, userController.LoginForm)

// typeUpload : 1 for uploadCover or Ava 
export default router;