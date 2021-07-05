import { IUserRepoInterface } from './IUserRepo'
import { User } from "../../entities/UserModel"
import { BaseRepository } from "../base/BaseRepo"
import { FilterQuery, FindOneOptions } from 'mongodb'
import { ObjectId } from 'mongodb'
import { isValidObjectId } from 'mongoose'
import * as Mongo from 'mongodb'


interface loginForm {
    username: string
    password: string
}
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
    public async Login(param: loginForm): Promise<User | Error> {
        interface userResponse {

            Username: boolean,
            Password: boolean,
            IsDelete: boolean,

        }
        Object.assign(param, { IsDelete: false })
        // Filter field u want response 
        let condition: userResponse = {
            Username: false,
            Password: false,
            IsDelete: false,
        }
        let findOption: FindOneOptions<userResponse> = {
            projection: condition
        }
        try {
            return await this._collection.findOne<User>(param, findOption)
        } catch (err) {
            return err
        }
    }
    public CountUser(): Promise<number> {
        return this._collection.countDocuments()
    }
    public GetUserByCondition(param): Promise<User[]> {
        return this._collection.find(param).toArray()
    }
    public async UpdateComicpost(_id: ObjectId, _idComic: ObjectId) {
        try {
            let UpdateMethod = {
                $push: {
                    "Comicpost": _idComic
                }
            }
            let result = await this._collection.updateOne({ _id: _id }, UpdateMethod);
            return !!result.result.ok
        } catch (err) {
            console.log(err)
        }
    }

    public async UpdateBookmark(id: ObjectId, _idComic: ObjectId) {
        let fillerQuery: FilterQuery<User> = {
            Bookmark: { $all: [_idComic] },
            _id: id
        }
        let checkResult = await this._collection.findOne(fillerQuery)
        console.log(checkResult)
        if (checkResult) {
            await this._collection.updateOne({ _id: id },
                { $pull: { "Bookmark": { $in: [_idComic] } } })
            return false
        } else {
            try {
                let UpdateMethod = {
                    $push: {
                        "Bookmark": _idComic
                    }
                }
                let result = await this._collection.updateOne({ _id: id }, UpdateMethod);
                return !!result.result.ok
            } catch (err) {
                console.log(err)
            }
        }
    }
    /**
     * checkUser
     * @param id // idUser
     */
    public async checkUser(id: ObjectId) {
        if (isValidObjectId(id)) {
            try {
                let result = await this._collection.findOne({ _id: id })
                if (result) {
                    return true
                } else {
                    return false
                }
            } catch (error) {
                return error
            }
        } else {
            return false
        }
    }
    public async updatePassword(username: string, item :any) {
        try {
            let UpdateMethod: Mongo.UpdateQuery<User> = {
                $set: item
            }
            let result: Mongo.UpdateWriteOpResult = await this._collection.updateOne({ Username: username }, UpdateMethod);
            return !!result.result.ok
        } catch (err) {
            console.error(err)
        }
    }
}