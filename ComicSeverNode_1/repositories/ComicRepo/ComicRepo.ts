import {Comic} from "../../entities/ComicModel"
import {BaseRepository} from "../base/BaseRepo"
import {FindOneOptions } from 'mongodb'
export default class ComicRepo extends BaseRepository<Comic>{


    GetUserByUsername(username: string): Promise<Comic> | undefined {
        try {
            let Options: FindOneOptions<Comic> = {
                sort: { "_id": -1 }
            }
            return this._collection.findOne<Comic>({ Username: username }, Options)
        } catch (err) {
            console.log(err.toString())
            return err
        }
    }
    public CountUser(): Promise<number> {
        return this._collection.countDocuments()
    }
    public GetUserByCondition (param): Promise<Comic[]>{
        return this._collection.find(param,).toArray()
    }
}