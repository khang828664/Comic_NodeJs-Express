import { ObjectId } from "mongodb"
import { AnyARecord } from "node:dns"
import { Comic } from "../entities"
import { ComicRepo } from "../repositories/index"
import { connect } from "./DbConnect"

const  UtileConnect = async () => {
    const database = await connect()
    const comicRepo = new ComicRepo (database,process.env.COMIC)
    return comicRepo
}
export const getComic = async () => {
    const comicFunction = await UtileConnect()
    const listComic  = await comicFunction.find()
    return listComic
} 
export const getComicByDesName = async (param:Comic) => {
    const comicFunction = await UtileConnect()
    const comic : Comic =  await comicFunction.findOneByCondition(param)
    return comic
}
export const getComicById = async (param:ObjectId) => {
    const comicFunction = await UtileConnect()
    const comic : Comic  =  await comicFunction.findOneById(param) 
    return comic
}
export const GetUserByCondition = async (param:Comic) => {
    const comicFunction = await UtileConnect()
    const user: Comic[] = await comicFunction.findByCondition(param)
    return user
}

export const CreateComic = async (param: Comic) => {
    const comicFunction = await UtileConnect()
    const value:ObjectId = await comicFunction.create(param)
    return value 
}
export const HardDeleteComic = async (param : ObjectId) => {
    const comicFunction = await UtileConnect()
    const returnValue :boolean =  await comicFunction.HardDelete(param)
    return returnValue 
} 
export const UpdateComic = async (_id:ObjectId,param:Comic) => {
    const comicFunction = await UtileConnect()
    const value = await comicFunction.update(_id ,param)
    return value
}
