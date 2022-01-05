import { IWrite } from '../IWrite'
import { IRead } from '../IRead'
import { User } from '../../entities/UserModel'
import * as Mongo from 'mongodb'
import { ObjectId } from 'mongodb'
import { Console } from 'node:console'

interface BaseObjectInset<T> {
    _id: Mongo.ObjectID
    isDelete: boolean
}

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T>
{
    public readonly _collection: Mongo.Collection
    public readonly _Db: Mongo.Db
    constructor(db: Mongo.Db, collectionName: string) {
        this._collection = db.collection(collectionName);
        this._Db = db
    }

    getDb = () => this._Db
    async create(item: T): Promise<ObjectId> {
        const result: Mongo.InsertOneWriteOpResult<BaseObjectInset<T>> = await this._collection.insertOne(item);
        return result.insertedId;
    }
    async update(id: Mongo.ObjectId, item: T): Promise<boolean> {
        try {
            let UpdateMethod: Mongo.UpdateQuery<T> = {
                $set: item
            }
            let result: Mongo.UpdateWriteOpResult = await this._collection.updateOne({ _id: id }, UpdateMethod);
            return !!result.result.ok
        } catch (err) {
            console.error(err)
        }
    }
    async HardDelete(id: Mongo.ObjectId): Promise<boolean> {
        let result = await this._collection.findOneAndDelete({ _id: id })
        return !!result.ok
    }
    async find(): Promise<T[]> {
        const result = await this._collection.find({}).sort("DateUpdate", -1).toArray()
        return result
    }
    async findOneById(id: Mongo.ObjectId): Promise<T> {
        const result = await this._collection.findOne({ _id: id })
        return result
    }
    async findByCondition(param: any): Promise<T[]> {
        try {
            const result = await this._collection.find(param).sort("_id", -1).toArray()
            return result
        } catch (err) {
            console.error(err)
            return err
        }
    }

    async getLimit({ start, end }): Promise<T[] | Error> {
        try {
            let result = await this._collection.find({})
                .skip(parseInt(start))
                .limit(parseInt(end))
                .sort("DateUpdate", -1).toArray()
            return result
        } catch (err) {
            console.log(err)
            return err
        }
    }
  
}