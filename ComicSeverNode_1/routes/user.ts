
import express = require ("express")
import *as mongo from 'mongodb'
import bodyParser = require("body-parser")
import {User} from   '../entities/UserModel'
import {getUser} from  '../Db/UserServices'
import *as userController from './controller/UserController'
import *as bodyparser from 'body-parser'
const router = express.Router();
const jsonConfig = bodyParser.json()
// Get All User
router.get('/users/all', async (req: express.Request, res: express.Response) => {
        console.log(req.body)
        let result = await userController.GetAllUser()
        res.status(200).json(result)
});
router.get('/users/by/username', jsonConfig, async (req: express.Request, res: express.Response) => {
    userController.GetUserByUserName(req, res)
})
router.get('/users/by/condition', jsonConfig, async (req: express.Request, res: express.Response) => {
     userController.GetUserByCondition(req,res)
     
})
router.post('/users/create', jsonConfig, async (req: express.Request, res: express.Response) => {
        userController.CreateUser(req,res)
})
router.post('/users/update', jsonConfig, async (req: express.Request, res: express.Response) => {
    console.table(req.body)
    userController.UpdateUser(req, res)
})
router.post('/users/delete', jsonConfig, async (req: express.Request, res: express.Response) => {
    console.log(req.body)
    userController.DeleteUser(req, res)
})
export default router;