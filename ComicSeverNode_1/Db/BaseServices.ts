
import {IBaseMethod} from './IBaseServices'
import {UserRepo} from '../repositories/index'
import {User} from '../entities/UserModel'
import {ObjectId } from 'mongodb'
import  {connect}from './DbConnect'
import *as mongo from 'mongodb'
import {BaseRepository} from '../repositories/base/BaseRepo'
// abstract class  BaseMethod<T> implements IBaseMethod<T>  {
  
//     /**
//      * connect
//     //  */
//     // private const db :mongo.Db
//     // private const repo : BaseRepository<T>
//     async GetAll() {
//     const list = await this.repo.find()
//     return list
//     }
//     // GetByCondition(param:string) {}
//     // NumberOfData() {}
//     // HardDelete() {}
//     // Create(Param:User){}
//     // Update(_id:ObjectId, Param:User){}
// }
// export class UserServices extends BaseMethod<UserRepo> {

// }