import {ObjectId} from 'mongodb'
export interface IWrite <T>{ 
    create(item: T): Promise<ObjectId>;
    update(id: ObjectId, item: T): Promise<boolean>;
    HardDelete(id: ObjectId): Promise<boolean>;
}