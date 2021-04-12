import {IUserRepoInterface} from './IUserRepo'
import {User} from "../../entities/UserModel"
import {BaseRepository} from "../base/BaseRepo"
import { FindOneOptions } from 'mongodb'
export default class UserRepo extends BaseRepository<User> implements IUserRepoInterface {


    GetUserByUsername(username: string): Promise<User> | undefined {
        try {
            let Options: FindOneOptions<User> = {
                sort: { "_id": -1 }
            }
            return this._collection.findOne<User>({ Username: username }, Options)
        } catch (err) {
            console.log(err.toString())
            return err
        }
    }
    public CountUser(): Promise<number> {
        return this._collection.countDocuments()
    }
    public GetUserByCondition (param): Promise< User[]>{
        return this._collection.find(param,).toArray()
    }
}