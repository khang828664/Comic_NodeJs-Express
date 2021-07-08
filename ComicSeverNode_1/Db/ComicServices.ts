import { ObjectId } from "mongodb"
import { AnyARecord } from "node:dns"
import { Comic } from "../entities"
import { ComicRepo } from "../repositories/index"
import { connect } from "./DbConnect"

const UtileConnect = async () => {
    const database = await connect()
    const comicRepo = new ComicRepo(database, process.env.COMIC)
    return comicRepo
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
    let value = await comicFunction.setBookmark(id,idUser)
    return value
 }
 export const SetLike = async (id: ObjectId, isLike:number) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.setLike(id, isLike)
    return value
 }
 export const GetBookmark = async (id: ObjectId) => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.getBookmark(id)
    return value
 }
 export const DemoUpdate = async () => {
    let comicFunction = await UtileConnect()
    let value = await comicFunction.updateDateComic()
    return value
 }