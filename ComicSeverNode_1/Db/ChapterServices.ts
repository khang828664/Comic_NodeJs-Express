import { ObjectId } from "mongodb"
import { fileURLToPath } from "node:url"
import { Chapter } from "../entities"
import { ChapterRepo } from "../repositories"
import { connect } from "./DbConnect"

const  UtileConnect = async () => {
    const database = await connect()
    const chapterRepo = new ChapterRepo (database,process.env.CHAPTER)
    return chapterRepo
}
export const getAllChapter = async () => {
    const ChapterFunction = await UtileConnect()
    const listChapter  = await ChapterFunction.find()
    return listChapter
} 
export const getChapterById = async (param:ObjectId) => {
    const comicFunction = await UtileConnect()
    const comic : Chapter  =  await comicFunction.findOneById(param) 
    return comic
}
export const GetChapterByCondition = async (param:Chapter) => {
    const comicFunction = await UtileConnect()
    const user: Chapter[] = await comicFunction.findByCondition(param)
    return user
}

export const CreateChapter = async (param: Chapter) => {
    const comicFunction = await UtileConnect()
    const value:ObjectId = await comicFunction.create(param)
    return value 
}
export const HardDeleteChapter = async (param : ObjectId) => {
    const chapterFunction = await UtileConnect()
    const returnValue :boolean =  await chapterFunction.HardDelete(param)
    return returnValue 
} 
export const AddChapterToComic = async (_idComic, _idChapter) =>{

    
}
export const UpdateChapter = async (_id:ObjectId,param:Chapter) => {
    const chapterFunction = await UtileConnect()
    const value = await chapterFunction.update(_id ,param)
    return value
}
export const  UploadImageToDatabase = async (filePatch:any, reqBody:any) => {
    let  chapterFunction = await UtileConnect()
    let  value = await chapterFunction.UploadImageChapterToDatabase(filePatch, reqBody) 
    return value 
}
// export const UpdateImageInDatabase = async (filePatch:any, reqBody:any) => {
//     let  chapterFunction = await UtileConnect()
//     let  value = await chapterFunction.UpdateImageInDatabase(filePatch, reqBody) 
//     return value
// }
export const DeleteImage  = async (id : ObjectId ) =>{
    let  chapterFunction = await UtileConnect()
    let  value = chapterFunction.DeleteImage(id)
    return value 
}
