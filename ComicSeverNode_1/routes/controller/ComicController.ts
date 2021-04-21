import express = require ("express")
import *as mongo from 'mongodb'
import bodyParser = require("body-parser")
import {Comic} from   '../../entities/ComicModel'
import *as ComicServices from '../../Db/ComicServices'
var _ = require('lodash');

export async function GetAllComic(req:express.Request,res:express.Response) {
    try {
        let comicData: Comic[] = await ComicServices.getComic()
        res.status(200).send({ data: comicData })
    }catch(err){ 
        console.log(err)
        res.status(204).send(err.toString())
    }
}
export async function GetComicByName(req:express.Request, res:express.Response ) {
    let param = req.query
    console.log(param)
    if (JSON.stringify(req.query) === "{}") {
        param = req.body
    }
    try {
        let conditionValue :Comic = Object.create({DesName:param.desname.toString()})
        await ComicServices.getComicByDesName(conditionValue)
            .then((comic: Comic) => {
                res.status(200).json({data: comic})
            })
            .catch(error => {
                console.error(error)
                res.send(error.toString())
            })
    } catch (err) {
        console.error(err)
        res.send(err)
    }
    return
}
export async function GetComicByIdUser(req:express.Request, res:express.Response) {
    let param = req.query
    if  (JSON.stringify(param) === "{}") {
        param = req.body
    }
    try {
        let conditionValue:Comic = Object.create({_idUser:param._idUser.toString()})
        await ComicServices.GetUserByCondition(conditionValue).then(
            (comic: Comic[])=>{
            res.status(200).json({data:comic})
            }
        ).catch()
    } catch(err) {
        console.error(err)
        res.send(err)
    }
    return
}
export async function GetComicByCondition(req:express.Request, res:express.Response) {
    console.log(req.body)
    let param = req.body
    if (JSON.stringify(req.body) === "{}") {
        param = req.query
    }
    await ComicServices.GetUserByCondition(param)
            .then((comic: Comic[]) => {
                res.status(200).json({data:comic})
            })
            .catch(error => {
                console.error(error)
                res.send(error.toString())
            })
    return
}
export async function CreateComic(req:express.Request, res:express.Response) {
   try{ 
    
    let comic:Comic  =  new Comic(req.body)
    if (req.body._idUser.toString()!=="") {
        comic.set_idUser(req.body._idUser)
    } else {
        throw new Error("Empty Id user");
    }
    let _id = comic.get_id()
    let _Desname = comic.getName().replace(/ /gi,"_").toUpperCase()
    comic.setDesname(_Desname)
    await ComicServices.CreateComic(comic)
    .then( async response => {
        if(response.toString()!=="") {
             let result = await ComicServices.getComicById(_id)
             res.status(200).json({data:result})
        }else res.status(404).send("Can't create username")
    }).catch(err=>{console.log(err)})
}catch(err) {
    if(err.toString() === "TypeError: Cannot read property 'replace' of undefined"){
    res.send("unidentified FieldName Check again")}else {
    res.send({Error : err.toString()})
    }
}
    return
}
export async function UpdateUser(req: express.Request, res: express.Response) {
    let _id = new mongo.ObjectId(req.body[0]._id)
    let _updateValue: Comic = req.body[1]
    let result = await ComicServices.UpdateComic(_id, _updateValue)
    res.send(result)
}
export async function DeleteComic(req: express.Request, res: express.Response) {
    try {
        let _id = new mongo.ObjectId(req.body._id)
        let _updateValue : Comic = Object.create({IsDelete:true})
        let result = await ComicServices.UpdateComic(_id, _updateValue)
    res.send(result)
        }
    catch(err){
        res.status(404).send(err.toString() )
    }
}
