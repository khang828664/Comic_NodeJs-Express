import { ObjectId } from "mongodb";

export default interface IBaseModel {
    _id: ObjectId
    IsDelete: boolean
    DateCreate: number
    DateUpdate: number
}
export abstract class BaseModule implements IBaseModel {
    _id: ObjectId;
    IsDelete: boolean = false
    DateCreate: number = Date.now()
    DateUpdate: number = Date.now()
    constructor() {
        this.IsDelete = false
        this.DateCreate = Date.now()
    }
    get_id() {
        return this._id
    }
    set_Update(parma: any) {
        this.DateUpdate = parma
    }
}