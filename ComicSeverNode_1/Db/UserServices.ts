import { connect } from './DbConnect'
import { UserRepo } from '../repositories/index'
import { User } from '../entities/UserModel'
import { ObjectId } from 'mongodb'

/// Utils Function /// 
const UtileConnect = async () => {
    const database = await connect()
    const userRepo = new UserRepo(database, process.env.USER)
    return userRepo
}
export const getUser = async () => {
    const userFunction = await UtileConnect()
    const listUser = await userFunction.find()
    return listUser
}
export const getUserByUserName = async (parma: string) => {
    const userFunction = await UtileConnect()
    const user: User = await userFunction.GetUserByUsername(parma)
    return user
}
export const GetUserByCondition = async (param) => {
    const userFunction = await UtileConnect()
    const user: User[] = await userFunction.findByCondition(param)
    return user
}
export const numberOfUser = async () => {
    const userFunction = await UtileConnect()
    const value = await userFunction.CountUser()
    return value
}
export const CreateUser = async (param: User) => {
    const userFunction = await UtileConnect()
    const value = await userFunction.create(param)
    return value
}
export const HardDeleteUser = async () => {

}
export const UpdateService = async (_id: ObjectId, param: any) => {
    const userFunction = await UtileConnect()
    const value = await userFunction.update(_id, param)
    return value
}
export const Login = async (param): Promise<User | Error> => {
    const userFunction = await UtileConnect()
    const value = await userFunction.Login(param)
    return value
}
export const UpdateComicpost = async (_id:  ObjectId, _idComic: ObjectId) => {
    const userFunction = await UtileConnect()
    const value = await userFunction.UpdateComicpost(_id, _idComic) 
    return value
}
export const UpdateBookmark = async (_id:  ObjectId, _idComic: ObjectId) => {
    const userFunction = await UtileConnect()
    const value = await userFunction.UpdateBookmark(_id, _idComic) 
    return value
}
export const CheckUser = async (_id:ObjectId)=>{
    let userFunction = await UtileConnect()
    const result = await userFunction.checkUser(_id)
    return result
}
export const  UpdatePassword = async (username:string, param:any) =>{
    let userFunction = await UtileConnect()
    const result = await userFunction.updatePassword(username,param)
    return result
}