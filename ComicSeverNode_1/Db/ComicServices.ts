import { ObjectId } from "mongodb"
import { Comic } from "../entities"
import { ComicRepo, UserRepo } from "../repositories/index"
import { connect } from "./DbConnect"

const UtileConnect = async () => {
    console.log(`Collection current connect: ${process.env.COMIC}`)
    let database = await connect()
    let comicRepo = new ComicRepo(database, process.env.COMIC)
    return comicRepo
}
const UserConnect = async () => {
    console.log(`Collection current connect: ${process.env.USER}`)
    let database = await connect()
    let userRepo = new UserRepo(database, process.env.USER)
    return userRepo
}
export const getComic = async () => {
    const comicFunction = await UtileConnect()
    const listComic = await comicFunction.find()
    return listComic
}
// export const getComicByDesName = async (param: Comic) => {
//     const comicFunction = await UtileConnect()
//     const comic: Comic = await comicFunction.findOneByCondition(param)
//     return comic
// }
export const getComicById = async (param: ObjectId) => {
    const comicFunction = await UtileConnect()
    const comic: Comic = await comicFunction.GetComicById(param)
    return comic
}
export const GetUserByCondition = async (param: Comic) => {
    const comicFunction = await UtileConnect()
    const user: Comic[] = await comicFunction.findByCondition(param)
    return user
}

export const CreateComic = async (param: Comic) => {
    const comicFunction = await UtileConnect()
    const value: ObjectId = await comicFunction.create(param)
    return value
}
export const HardDeleteComic = async (param: ObjectId) => {
    const comicFunction = await UtileConnect()
    const returnValue: boolean = await comicFunction.HardDelete(param)
    return returnValue
}
export const UpdateComic = async (_id: ObjectId, param: any) => {
    const comicFunction = await UtileConnect()
    const value = await comicFunction.update(_id, param)
    return value
}
export const GetLimit = async ({ start, end }) => {
    const comicFunction = await UtileConnect()
    const value = await comicFunction.getLimit({ start, end })
    return value
}
export const UploadCoverImage = async (filePath: any, reqBody: any) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.UploadCoverImageToDatabase(filePath, reqBody)
    return value
}
export const Search = async (parma: any) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.searchComic(parma)
    return value
}
export const SearchAuthor = async (param: any) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.searchComicAuthor(param)
    return value
}
export const SetUserBookmark = async (id: ObjectId, idUser: ObjectId) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.setBookmark(id, idUser)
    return value
}
export const SetLike = async (id: ObjectId, isLike: number) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.setLike(id, isLike)
    return value
}
/**
 * GetBookmark
 * @param {ObjectId} id
 */
export const GetBookmark = async (id: ObjectId) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.getBookmark(id)
    return value
}
/**
 * review @param {ObjectId} id
 * set review @param {ObjectId} user
 * review content @param {string} content
 */
export const SetReview = async (id: ObjectId, userId: ObjectId, content: string, datePost: number, username:string) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.SetReview(id, userId, content, datePost, username)
    return value
}
/**
 * Get Review Comic
 * @param {ObjectId} comicId
 */
export const GetReview = async (comicId: ObjectId) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.GetReview(comicId)
    return value
}
/**
 * Get all Comment
 * @param {ObjectId} idComic 
 * using id Comic to get all comment 
 */
export const GetComment = async (idComic: ObjectId) => {
    let comicFunction = await UserConnect()
    let value = await comicFunction.GetComment(idComic)
    return value
}
export const DemoUpdate = async () => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.updateDateComic()
    return value
}