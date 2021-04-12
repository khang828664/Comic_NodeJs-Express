import {ObjectId} from 'mongodb'
export  interface IRead<T> {
    find() : Promise<T[]>;
    findByCondition(param:T): Promise<T[]>
    findOneById(_id :ObjectId): Promise<T>;
}