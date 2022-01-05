import { Chapter } from '../../entities'
import { ChapterServices, ComicServices, ImageServices } from '../../Db'
import *as middlewareUpload from '../middleware/UploadImage'
import *as mongo from 'mongodb'
import express = require("express")
import { ObjectId } from 'mongodb'
import { Error } from 'mongoose'
export async function CreateChapter(req: express.Request, res: express.Response, next) {
    try {
        res.header("Access-Control-Allow-Origin", "http://localhost:3001");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        await middlewareUpload.middlewareUpload(req, res)
        let ArrayId = await ChapterServices.UploadImageToDatabase(req.files, req.body)
        console.log(ArrayId.NameImage)
        let arrayId: ObjectId[] = []
        ArrayId.ArrayId.map((value, index) => {
            arrayId.push(value)
        })
        let _idComic = ""
        let chapter: Chapter = new Chapter(req.body)
        if (req.body._idComic.toString() !== "") {
            chapter.set_IdComic(new ObjectId(req.body._idComic))
            _idComic = req.body._idComic.toString()
        } else {
            throw new Error("Null ID Comic");
        }
        chapter.set_IdImage(arrayId)
        await ComicServices.UpdateComic(new ObjectId(_idComic), { DateUpdate: Date.now() })
        let result = await ChapterServices.CreateChapter(chapter)
        res.send(result)
    } catch (err) {
        res.send(err.toString())
    }
}
//Update chapter controller
export async function UpdateChapter(req: express.Request, res: express.Response) {
    await middlewareUpload.middlewareUpload(req, res)
    let _id = new ObjectId(req.body._id)
    let valueUpdate: Chapter = new Chapter(req.body)
    try {
        let arrayId = await ChapterServices.UploadImageToDatabase(req.files, req.body)
        valueUpdate.set_IdImage(arrayId.arrayId)
        let result = await ChapterServices.UpdateChapter(_id, valueUpdate)
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}
export async function UpdateChapterImage(req: express.Request, res: express.Response) {
    let _id = new ObjectId(req.body._id)
}
export async function GetChapterAll(req: express.Request, res: express.Response) {
    try {
        let result = await ChapterServices.getAllChapter()
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}
export async function GetChapterById(req: express.Request, res: express.Response) {
    try {
        let result = await ChapterServices.getChapterById(new ObjectId(req.params._id))
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}
export async function DeleteImage(req: express.Request, res: express.Response) {
    try {
        let _id = new ObjectId(req.params._id)
        await ChapterServices.DeleteImage(_id).
            then(data => res.send(data)).
            catch((err: Error) => res.send(err.message))
    } catch (err) {
        console.log(err)
        res.send({ Error: err })
    }
}
export async function GetChapterByComicId(req: express.Request, res: express.Response) {
    try {
        let _idComic = new ObjectId(req.params._idComic)
        let result = await ChapterServices.GetChapterByCondition({ _idComic: _idComic })
        res.json({
            result: true,
            data: result
        })
    } catch (err) {
        res.send({
            result: false,
            data: err
        })
    }
}