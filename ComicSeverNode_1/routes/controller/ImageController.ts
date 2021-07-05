import { Image } from '../../entities/ImageModel'
import *as ImageServices from '../../Db/ImageServices'
import *as middlewareUpload from '../middleware/UploadImage'
import *as mongo from 'mongodb'
import express = require("express")
import { ObjectId } from 'mongodb'
export async function UploadImage(req: express.Request, res: express.Response) {
    try {
        await middlewareUpload.middlewareUpload(req, res).then().catch((err: Error) => console.log(err.message))
        let typeUpload: string = req.body.typeUpload;
        let ArrayId = await middlewareUpload.connect(req.files, typeUpload)
        console.log(ArrayId.ArrayId)
        console.log(ArrayId.NameImage)
        let arrayLink: string[] = []
        ArrayId.NameImage.map((value, index) => {
            let name = `${process.env.MAIN_URL}/api/image/image/${value}`
            arrayLink.push(name)
        })
        res.send(arrayLink)
    } catch (err) {
        res.send(err)
    }
}
export async function GetImage(req: express.Request, res: express.Response) {
    try {
        let connect = await mongo.MongoClient.connect(process.env.BASE_URL)
        let Db = connect.db(process.env.DATA_NAME)
        let collectionChunk = Db.collection("ImageChapter.chunks")
        let collectionFile = Db.collection("ImageChapter.files")
        let FileImage = await collectionFile.findOne({ _id: new ObjectId(req.body._id.toString()) })
        let ChunkImage = await collectionChunk.findOne({ files_id: FileImage._id })
        console.log(process.env.MAIN_URL + req.baseUrl)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}
//
// type 0 : imageChapter
// type 1 : imageCover
// type 2 : AvaImage 
//
export async function GetImageByName(req: express.Request, res: express.Response) {
    try {
        let connect = await mongo.MongoClient.connect(process.env.BASE_URL)
        let Db = connect.db(process.env.DATA_NAME)
        let type: number = parseInt(req.params.type)
        let nameChunk: string = ""
        let nameFiles: string = ""
        switch (type) {
            case 0:
                nameChunk = "ImageChapter.chunks"
                nameFiles = "ImageChapter.files"
                break;
            case 1:
                nameChunk = "ImageCover.chunks"
                nameFiles = "ImageCover.files"
                break;
            case 2:
                nameChunk = "ImageAva.chunks"
                nameFiles = "ImageAva.files"
                break;
            default:
                break;
        }
        let collectionChunk = Db.collection(nameChunk)
        let collectionFile = Db.collection(nameFiles)
        if (ObjectId.isValid(req.params.name)) {
            console.log("true")
            let FileImage = await collectionFile.findOne({ _id: new ObjectId(req.params.name) })
            let ChunkImage = await collectionChunk.find({ files_id: FileImage._id }).toArray()
            let string = ""
            ChunkImage.map((item, index) => {
                string = string + item.data.toString('binary')
            })
            res.contentType("image/jpeg").send(Buffer.from(string, "binary"))
            console.table(FileImage)
        } else {
            console.log("false")
            let FileImage = await collectionFile.findOne({ filename: req.params.name })
            let ChunkImage = await collectionChunk.findOne({ files_id: FileImage._id })
            let string = ChunkImage.data.toString("binary")
            res.contentType("image/jpeg").send(Buffer.from(string, "binary"))
            console.table(FileImage)
        }

    } catch (err) {
        console.log(err)
        res.send(err)
    }
}
