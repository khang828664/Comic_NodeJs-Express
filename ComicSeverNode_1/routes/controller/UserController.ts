
import { Request, Response } from 'express'
import *as mongo from 'mongodb'
import bodyParser = require("body-parser")
import { User } from '../../entities/UserModel'
import *as UserServices from '../../Db/UserServices'
import *as middlewareUpload from '../middleware/UploadImage'
import { Comic } from "../../entities"
import { ObjectId } from "mongodb"
import { ComicServices } from "../../Db"

export async function GetAllUser(req: Request, res: Response) {
    try {
        let userData: User[] = await UserServices.getUser()
        res.status(200).send({
            result: true,
            data: userData
        })
    } catch (err) {
        console.log(err)
        res.status(204).send(err.toString())
    }
}
export async function GetUserByUserName(req: Request, res: Response) {
    let param = req.query
    console.log(param)
    if (JSON.stringify(req.query) === "{}") {
        param = req.body
    }
    try {
        await UserServices.getUserByUserName(param.username.toString())
            .then((user: User) => {
                res.status(200).json({ data: user })
            })
            .catch(error => {
                console.error(error)
                res.send(error.toString())
            })
    } catch (err) {
        console.error(err)
        res.send(err)
    }
}
export async function GetUserByCondition(req: Request, res: Response) {
    console.log(req.body)
    let param = req.body
    if (JSON.stringify(req.body) === "{}") {
        param = req.query
    }
    await UserServices.GetUserByCondition(param)
        .then((user: User[]) => {
            res.status(200).json({ data: user })
        })
        .catch(error => {
            console.error(error)
            res.send(error.toString())
        })
    return
}
export async function CreateUser(req: Request, res: Response) {
    console.log(req.body)
    let user: User = new User(req.body)
    let id = user.get_id()
    await UserServices.CreateUser(user)
        .then(async response => {
            if (response) {
                let result = await UserServices.GetUserByCondition({ _id: response })

                res.status(200).json({
                    result: true,
                    data: result[0]
                })
            } else res.status(404).send("Can't create username")
        }).catch(err => {
            res.send({
                result: false,
                data: err.toString()
            })

        })
    return
}
export async function UpdateUser(req: Request, res: Response) {
    let _id = new mongo.ObjectId(req.body[0]._id)
    let _updateValue: User = req.body[1]
    let result = await UserServices.UpdateService(_id, _updateValue)
    res.send(result)
}
export async function UpdatePassword(req: Request, res: Response) {
    try {
        let username = req.body[0].username
        /**
         * @param newPassword = { Password:"newPassword" }
         */
        let newPassword = req.body[1]
        let result = await UserServices.UpdateService(username, newPassword)
        res.send({
            result: true,
            data: result
        })
    } catch (err) {
        res.send({
            result: false,
            data: err.toString()
        })
    }

}
export async function DeleteUser(req: Request, res: Response) {
    try {
        let _id = new mongo.ObjectId(req.body._id)
        let _updateValue: User = Object.create({ IsDelete: true })
        let result = await UserServices.UpdateService(_id, _updateValue)
        res.send(result)
    }
    catch (err) {
        res.status(404).send(err.toString())
    }
}

// Router Login
export async function Login(req: Request, res: Response) {
    let username: string = req.body.username
    let password: string = req.body.password
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const userLoginValue = { Username: username, Password: password }
    try {
        let result = await UserServices.Login(userLoginValue)
        if (result) {
            res.json({ result: true, data: result })
        }
        else {
            res.json({ result: false, data: null })
        }
    } catch (err) {
        res.send(err)
    }
}
export async function uploadAvatar(req: Request, res: Response) {
    try {
        await middlewareUpload.middlewareUpload(req, res)
        let typeUpload: string = req.body.typeUpload;
        let ArrayId = await middlewareUpload.connect(req.files, typeUpload)
        let _idUser = new mongo.ObjectId(req.body._idUser)
        console.table(req.body.typeUpload)
        await UserServices.UpdateService(_idUser, { Avatar: ArrayId.ArrayId[0].toString() })
        res.json(ArrayId);
    } catch (err) {
        res.send(err)
    }
}
export async function uploadCover(req: Request, res: Response) {
    try {
        await middlewareUpload.middlewareUpload(req, res)
        let typeUpload: string = req.body.typeUpload;
        let ArrayId = await middlewareUpload.connect(req.files, typeUpload)
        let _idUser = new mongo.ObjectId(req.body._idUser)
        console.table(req.body.typeUpload)
        await UserServices.UpdateService(_idUser, { Avatar: ArrayId.ArrayId[0].toString() })
        res.json(ArrayId);
    } catch (err) {
        res.send(err)
    }
}
export async function GetComicByIdUser(req: Request, res: Response) {
    let param = req.query
    if (JSON.stringify(param) === "{}") {
        param = req.body
    }
    /** 
     * 
     */
    try {
        res.header("Access-Control-Allow-Origin", "http://localhost:3001");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        let conditionValue: Comic = Object.create({ _idUser: new ObjectId(param._idUser.toString()) })
        await ComicServices.GetUserByCondition(conditionValue).then(
            (comic: Comic[]) => {
                res.status(200).json({
                    result: true,
                    data: comic
                })
            }
        ).catch()
    } catch (err) {
        console.error(err)
        res.send({
            result: false,
            data: err.toString()
        })
    }
    return

}
/**
 * post comment controller
 */
export async function PostComment(req: Request, res: Response) {
    try {

        let { userId, comicId, content } = req.body
        let datePost =  Date.now()
        console.log(req.body)
        let result = await UserServices.PostComment(new ObjectId(userId), new ObjectId(comicId), content, datePost)
        res.json({
            result: true,
            data: result
        })
    } catch (e) {
        res.json({
            result: false,
            data: e.message.toString()
        })
    }
}
export function LoginForm(req: Request, res: Response) {
    res.render("login")
}