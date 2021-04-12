import {connect} from './DbConnect'
import {UserRepo} from '../repositories/index'
import {User} from '../entities/UserModel'
import {ObjectId } from 'mongodb'

/// Utils Function /// 
const  UtileConnect = async () => {
    const database = await connect()
    const userRepo = new UserRepo (database,process.env.USER)
    return userRepo
}
export const getUser = async () => {
    const userFunction = await UtileConnect()
    const listUser = await userFunction.find()
    return listUser
} 
export const getUserByUserName = async (parma:string) => {
    const userFunction = await UtileConnect()
    const user : User  =  await userFunction.GetUserByUsername(parma)
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
export const UpdateService = async (_id:ObjectId,param:User) => {
    const userFunction = await UtileConnect()
    const value = await userFunction.update(_id ,param)
    return value
}
