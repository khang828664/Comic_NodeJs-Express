import {Chapter} from "../../entities"
import {BaseRepository} from "../base/BaseRepo"
import {FindOneOptions, ObjectId, GridFSBucket } from 'mongodb'
import * as fs from 'fs'

export default class ChapterRepo extends BaseRepository<Chapter> {

    public CountChapter(param:ObjectId): Promise<number> {
        return this._collection.find({_idComic:param}).count()
    }
    public GetChapterByCondition (param): Promise<Chapter[]>{
        return this._collection.find(param,).toArray()
    }
    public UploadImageChapterToDatabase(filePath, reqBody):any{
        let {_idComic, ChapterIndex} = reqBody
    try {
        let bucket = new GridFSBucket(this._Db,{bucketName:"ImageChapter"})
        let NameImage:string [] =  []
        let ArrayId:string  [] = []
        
         /// Upload many file to database 
         if(filePath){
         filePath.map((value ,index)=> {
            let nameImage = index.toString()+_idComic+ChapterIndex+Date.now().toString()
            let uploadStream = bucket.openUploadStream(nameImage)
            fs.createReadStream(value.path.toString(),{autoClose:true}).pipe(uploadStream)
            let id = uploadStream.id.toString()
             NameImage.push(nameImage)
             ArrayId.push(id)
            })
            let ObjectA = Object.create({NameImage: NameImage, ArrayId: ArrayId})
            return ObjectA
        }else {
            return {}
        }
            
    } catch (err) {
        console.error(err)
        return err 
    }
    }
    public async DeleteImage (Id:ObjectId):Promise<Boolean|Error>
    {
        let bucket = new GridFSBucket(this._Db,{bucketName:"ImageChapter"})
        /// Create promise for return because bucket delete don't return 1 promise
        return new Promise( (resolve,rejects)=>{
            bucket.delete(Id,( err )=>{
                if(err){
                return rejects(err)
                }
                resolve(true)
            })
        })
    }
}