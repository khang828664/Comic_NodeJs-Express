import *as multer from "multer";
import *as util from 'util'
import * as mongo from "mongodb"
import *as  fs from 'fs'
import { ObjectId } from "mongodb";
import *as Crypto from "crypto";


interface chapterInfo {
    ComicName: string,
    ChapterIndex: string
}
// Kêt nối với database để upload ảnh 
/**
 * This returns Promise<Object|Error>
 * @function
 * @param {any} filePatch
 * @param {chapterInfo} chapterInfo
 * @param {typeUpload} number
 * @returns {Promise<any|Error>}
 */
export async function connect(filePatch: any,
    typeUpload: string): Promise<any | Error> {
    try {
        let connect = await mongo.MongoClient.connect(process.env.BASE_URL)
        let Db = connect.db(process.env.DATA_NAME)
        let bucketName: string;
        switch (parseInt(typeUpload)) {
            case 0:
                bucketName = "ImageCover"
                break;
            case 1:
                bucketName = "ImageAva"
                break;
            default:
                break;
        }
        let bucket = new mongo.GridFSBucket(Db, { bucketName: bucketName })
        let ArrayId: string[] = []
        let NameImage: string[] = []

        /// Upload many file to database 
        filePatch.map((value, index) => {
            let randomStr = Crypto.randomBytes(20).toString('hex');
            let nameImage = index.toString() + randomStr + Date.now().toString()
            console.log(nameImage)
            let uploadStream = bucket.openUploadStream(nameImage)
            // Create flow stream value from local folder to Database
            fs.createReadStream(value.path.toString(), { autoClose: true }).pipe(uploadStream)
            let id = uploadStream.id.toString()
            NameImage.push(nameImage)
            ArrayId.push(id)
        })
        // return Image picture Upload and Id picture upload
        let ObjectA = { ArrayId: ArrayId, NameImage: NameImage }
        return ObjectA
    } catch (err) {
        return err
    }

}

export async function GetImage(param: string[]): Promise<string[] | Error> {
    try {
        let connect = await mongo.MongoClient.connect(process.env.BASE_URL)
        let Db = connect.db(process.env.DATA_NAME)
        let bucket = Db.collection("ImageChapter.chunks")
        let ArrayId: string[] = []
        param.map(async (value, index) => {
            console.log(value)
            let string = value.toString()
            let temp = await bucket.findOne({ files_id: new ObjectId(string) })
            console.log(temp)
        })
        return ArrayId
    } catch (err) {
        return err
    }
}
// Upload files to local Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = './Upload/Images'
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: (req, file, cb) => {
        let { ComicName, ChapterIndex } = req.body
        let name = ComicName + ChapterIndex + Date.now().toString() + Math.round(Math.random() * 1E9)
        cb(null, name)
    }
})
const limit = {
    files: 300,
    fileSize: 40097152  //bytes
}
export const UploadFile = multer({ storage: storage, limits: limit }).any()
export const middlewareUpload = util.promisify(UploadFile)
