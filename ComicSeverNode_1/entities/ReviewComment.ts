import { ObjectId } from "mongodb";
import IBaseModel, { BaseModule } from "./IBaseModel";

interface IReviewComment extends IBaseModel {
    content:string
}
export class ReviewComment extends BaseModule implements IReviewComment {
    _id: ObjectId;
    IsDelete: boolean;
    DateCreate: number;
    DateUpdate: number;
    constructor(content:string) {
        super()
        this.content = content
    }
    content: string;
    setContent (content: string) {
        this.content = content
    }
    getContent = () => this.content
}