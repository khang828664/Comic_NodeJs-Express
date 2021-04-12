import { ObjectId } from "mongodb";
import { User } from "../entities/UserModel";

export interface IBaseMethod<T> {
    GetAll():Promise<T[]>
    // GetByCondition(param:string):Promise<T[]>
    // NumberOfData(): Promise<number>, 
    // HardDelete(): Promise<boolean>,
    // Create(Param:User):Promise<boolean>, 
    // Update(_id:ObjectId, Param:User):Promise<T>
}
