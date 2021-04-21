import express = require ("express")
import *as mongo from 'mongodb'
import bodyParser = require("body-parser")
import {User} from   '../../entities/UserModel'
import *as UserServices from '../../Db/UserServices'

export async function GetAllUser(req:express.Request,res:express.Response) {
    try {
        let userData: User[] = await UserServices.getUser()
        res.status(200).send({ data: userData })
    }catch(err){
        console.log(err)
        res.status(204).send(err.toString())
    }
}
export async function GetUserByUserName(req:express.Request, res:express.Response ) {
    let param = req.query
    console.log(param)
    if (JSON.stringify(req.query) === "{}") {
        param = req.body
    }
    try {
        await UserServices.getUserByUserName(param.username.toString())
            .then((user: User) => {
                res.status(200).json({data: user})
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
export async function GetUserByCondition(req:express.Request, res:express.Response) {
    console.log(req.body)
    let param = req.body
    if (JSON.stringify(req.body) === "{}") {
        param = req.query
    }
    await UserServices.GetUserByCondition(param)
            .then((user: User[]) => {
                res.status(200).json({data:user})
            })
            .catch(error => {
                console.error(error)
                res.send(error.toString())
            })
    return
}
export async function CreateUser(req:express.Request, res:express.Response) {
    console.log(req.body)
    let user: User = new User(req.body)
    let id = user.get_id()
    await UserServices.CreateUser(user)
    .then( async response => {
        if (response) {
            let result = await UserServices.GetUserByCondition({_id:id})
             res.status(200).json({data:result})
        }else res.status(404).send("Can't create username")
    }).catch(err=>{console.log(err)})
    return
}
export async function UpdateUser(req: express.Request, res: express.Response) {
    let _id = new mongo.ObjectId(req.body[0]._id)
    let _updateValue: User = req.body[1]
    let result = await UserServices.UpdateService(_id, _updateValue)
    res.send(result)
}
export async function DeleteUser(req: express.Request, res: express.Response) {
    try {
        let _id = new mongo.ObjectId(req.body._id)
        let _updateValue : User = Object.create({IsDelete:true})
        let result = await UserServices.UpdateService(_id, _updateValue)
    res.send(result)
        }
    catch(err){
        res.status(404).send(err.toString() )
    }
}
