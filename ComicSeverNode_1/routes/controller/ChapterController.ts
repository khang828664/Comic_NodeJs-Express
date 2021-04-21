import {Chapter} from   '../../entities'
import {ChapterServices} from '../../Db'
import *as middlewareUpload from '../middleware/UploadImage'
import *as mongo  from 'mongodb'
import express = require ("express")
import { ObjectId } from 'mongodb'
import { Error } from 'mongoose'
export async function CreateChapter (req:express.Request, res:express.Response, next) { 
    try {
        await middlewareUpload.middlewareUpload(req,res)
        let ArrayId = await ChapterServices.UploadImageToDatabase(req.files,req.body)
        console.log(ArrayId.NameImage)
        let arrayLink:string []  = [] 
        let arrayId: ObjectId [] = []
         ArrayId.ArrayId.map((value, index)=>{ 
            arrayId.push(value)
        })
        let chapter: Chapter = new Chapter(req.body)
        if(req.body._idComic.toString() !== ""){
        chapter.set_IdComic(req.body._idComic)
        } else{
            throw new Error("Null ID Comic");
        }
        chapter.set_IdImage(arrayId)
        let result = await ChapterServices.CreateChapter(chapter)
        res.send(result)
    }catch(err) {
        res.send(err.toString())
    }
}
export async function UpdateChapter (req: express.Request, res: express.Response) {
 
}
export async function GetChapterAll (req:express.Request, res:express.Response) {
    try {
        let result =  await ChapterServices.getAllChapter()
        res.status(200).json(result)
    }catch(err) {
        console.log(err)
        res.send(err)
    }
}
export async function GetChapterById (req:express.Request, res:express.Response) {
    try {
        let result = await ChapterServices.getChapterById(new ObjectId (req.params._id))
        res.status(200).json(result)
    }catch(err) {
        console.log(err)
        res.send(err)
    }
}
export  async function DeleteImage(req: express.Request, res: express.Response) {
    try {
        let _id = new ObjectId (req.params._id)
        await ChapterServices.DeleteImage(_id).
            then(data => res.send(data)).
            catch((err:Error)=>res.send(err.message))
    }catch (err){   
        console.log(err)
        res.send({Error: err})
    }
}
