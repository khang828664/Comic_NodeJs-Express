import *as multer from "multer";
import *as util from 'util'
import  * as mongo from "mongodb"
import  *as  fs  from 'fs'
import { GridFSBucket,ObjectId } from "mongodb";
import { UploadImage } from "../controller/ImageController";
import  {ChapterServices}  from  '../../Db'

interface chapterInfo {
    ComicName: string,
    ChapterIndex:string
}
export async function connect (filePatch: any,chapterInfo :chapterInfo) : Promise<any|Error>  {
    let {ComicName, ChapterIndex} = chapterInfo
    try {
        let connect = await mongo.MongoClient.connect(process.env.BASE_URL)
        let Db = connect.db(process.env.DATA_NAME)
        let bucket = new mongo.GridFSBucket(Db,{bucketName:"ImageChapter"})
        let ArrayId:string[] = []
        let NameImage:string[] = [] 
        
    /// Upload many file to database 
         filePatch.map((value ,index)=> {
            let nameImage = index.toString()+ComicName+ChapterIndex+Date.now().toString()
            let uploadStream = bucket.openUploadStream(nameImage)
            fs.createReadStream(value.path.toString(),{autoClose:true}).pipe(uploadStream)
            let id = uploadStream.id.toString()
             NameImage.push(nameImage)
             ArrayId.push(id)
            })
            let ObjectA =  Object.create({ArrayId: ArrayId, NameImage :NameImage})
    return ObjectA
}   catch(err){
    return err
}}

export async function GetImage(param:string []) : Promise<string[]|Error>{
    try {
        let connect = await mongo.MongoClient.connect(process.env.BASE_URL)
        let Db = connect.db(process.env.DATA_NAME)
        let bucket = Db.collection("ImageChapter.chunks")
        let ArrayId: string[]  = []
        param.map( async (value, index)=>{
        console.log(value)
        let string =  value.toString()
        let temp =  await bucket.findOne({files_id: new ObjectId(string)})
        console.log(temp)
        })
       return ArrayId 
    }catch(err)
    {
        return err
    }
}
const storage =  multer.diskStorage({
    destination: function (req, file , cb) {
        let { ComicName, ChapterIndex } = req.body
        let path = './Upload/Images'
        fs.mkdirSync(path,{ recursive: true })
        cb(null,path)
    },
    filename:(req, file, cb ) => {
        let {ComicName, ChapterIndex } =  req.body 
        let name  =  ComicName+ChapterIndex+Date.now().toString()+Math.round(Math.random() * 1E9)
        cb(null,name)
    }
})
const limit = {
    files : 40,
    fileSize : 40097152 
}
export const UploadFile =  multer({storage:storage,limits:limit}).array("Files")
export const middlewareUpload = util.promisify(UploadFile)
