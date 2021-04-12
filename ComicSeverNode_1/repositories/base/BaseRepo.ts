import {IWrite} from '../IWrite'
import {IRead} from '../IRead'
import {User} from '../../entities/UserModel' 
import  * as Mongo  from 'mongodb'

interface BaseObjectInset<T> {
_id : Mongo.ObjectID
isDelete:boolean
}
export abstract class  BaseRepository<T> implements IWrite<T>, IRead<T> 
{
    public readonly _collection  : Mongo.Collection
    constructor(db: Mongo.Db, collectionName: string) {
        this._collection = db.collection(collectionName);
      }
  
    async create (item: T): Promise<boolean> {
        const result: Mongo.InsertOneWriteOpResult<BaseObjectInset<T>> = await this._collection.insertOne(item);
        return !!result.result.ok;
    }
    async update(id: Mongo.ObjectId, item: T): Promise<boolean> {
        try {let filterMethod: Mongo.FilterQuery<T> = await this._collection.findOne({ _id: id })
        let UpdateMethod: Mongo.UpdateQuery<T> = {
            $set: item
        }
        let result: Mongo.UpdateWriteOpResult = await this._collection.updateOne(filterMethod, UpdateMethod);
        return !!result.result.ok
    }catch(err) {
        console.error(err)
    }
    }
    async HardDelete(id: Mongo.ObjectId): Promise<boolean> {
        let result =  await this._collection.findOneAndDelete({ _id: id }).then(
            res => true
        ).catch(err => {
            console.log(err.toString())
            return false
        })
        return result
    }
    async  find(): Promise<T[]> {
        const result  =  await this._collection.find({}).sort("_id",-1).toArray()
        return result
    }
    async findOneById(id: Mongo.ObjectId): Promise<T> {
        const result = await this._collection.findOne({_id : id})
       return result
    }
    async findByCondition(param: T): Promise<T[]> {
        try {
        const result = await this._collection.find(param).sort("_id",-1).toArray()
        return result
        } catch (err) {
        console.error(err)
        return err
        }
    }
}