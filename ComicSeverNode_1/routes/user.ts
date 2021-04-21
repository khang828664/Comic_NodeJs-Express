
import express = require ("express")
import *as userController from './controller/UserController'
const router = express.Router();
const jsonConfig = express.json()
// Get All User
router.get('/all', userController.GetAllUser) 
router.get('/by/username', jsonConfig, userController.GetUserByUserName) 
router.get('/by/condition', jsonConfig, userController.GetUserByCondition)
router.post('/create', jsonConfig, userController.CreateUser)
router.post('/update', jsonConfig, userController.UpdateUser)
router.post('/delete', jsonConfig, userController.DeleteUser)
export default router;