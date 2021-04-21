import { ObjectId } from "mongodb";

export default interface IBaseModel {
    _id: ObjectId
    IsDelete: boolean
    DateCreate: string
    DateUpdate: string
}
export abstract class  BaseModule  implements IBaseModel {
    _id: ObjectId;
    IsDelete: boolean = false
    DateCreate: string =  new Date().toDateString()
    DateUpdate: string = new Date().toDateString()
    constructor() {
        this._id = new ObjectId()
        this.IsDelete = false
        this.DateCreate = new Date().toDateString()
    }
    get_id() {
         return this._id
    }
}