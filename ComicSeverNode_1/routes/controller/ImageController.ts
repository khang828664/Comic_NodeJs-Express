import {Image} from   '../../entities/ImageModel'
import *as ImageServices from '../../Db/ImageServices'
import *as middlewareUpload from '../middleware/UploadImage'
import *as mongo  from 'mongodb'
import express = require ("express")
import { ObjectId } from 'mongodb'
export async function UploadImage (req:express.Request, res:express.Response,next) { 
    try {
        await middlewareUpload.middlewareUpload(req,res)
        let ArrayId = await middlewareUpload.connect(req.files,req.body)
        console.log(ArrayId.ArrayId)
        console.log(ArrayId.NameImage)
        let arrayLink:string []  = [] 
        ArrayId.NameImage.map((value, index)=>{ 
            let name =  `${process.env.MAIN_URL}/api/image/image/${value}`
            arrayLink.push(name)
        })
        res.send(arrayLink)
    }catch(err) {
        res.send(err)
    }
}
export async function GetImage (req:express.Request, res:express.Response) {
    try {
        let connect = await mongo.MongoClient.connect(process.env.BASE_URL)
        let Db = connect.db(process.env.DATA_NAME)
        let collectionChunk = Db.collection("ImageChapter.chunks")
        let collectionFile = Db.collection("ImageChapter.files")
        let FileImage = await collectionFile.findOne({_id:new ObjectId(req.body._id.toString())})
        let ChunkImage = await collectionChunk.findOne({files_id:FileImage._id})
        let string  = ChunkImage.data.toString("base64")
        let buffe = ChunkImage.data.buffer
        let string1 = Buffer.from(buffe,"binary").toString("base64")
        console.log(process.env.MAIN_URL+req.baseUrl)
    }catch(err) {
        console.log(err)
        res.send(err)
    }
}
export async function GetImageByName (req:express.Request, res:express.Response) {
    try {
        let connect = await mongo.MongoClient.connect(process.env.BASE_URL)
        let Db = connect.db(process.env.DATA_NAME)
        let collectionChunk = Db.collection("ImageChapter.chunks")
        let collectionFile = Db.collection("ImageChapter.files")
        let FileImage = await collectionFile.findOne({filename:req.params.name})
        let ChunkImage = await collectionChunk.findOne({files_id:FileImage._id})
        let string  = ChunkImage.data.toString("base64")
        let baseUrl = req.baseUrl
        res.contentType("image/jpeg").send(Buffer.from(string,'base64'))
    }catch(err) {
        console.log(err)
        res.send(err)
    }
}
