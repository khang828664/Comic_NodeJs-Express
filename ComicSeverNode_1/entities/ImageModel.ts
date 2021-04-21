import { ObjectId } from "mongodb"
import IBaseModel, { BaseModule } from "./IBaseModel"
import  *as mongo from "mongodb"

interface IImage extends  IBaseModel {
    _idChapter:ObjectId
    ImageUrl:string
    ImageValue : Buffer
    contentStyle : string
}
export class Image extends BaseModule implements IImage {
    _idChapter : ObjectId
    ImageUrl : string
    ImageValue :Buffer
    contentStyle: string
    constructor(image:IImage) {
        super()
        this._idChapter = image._idChapter
        this.ImageUrl = image.ImageUrl
        this.ImageValue = image.ImageValue
    }
    
    set_idChapter (_idChapter:ObjectId) {
        this._idChapter =  _idChapter
    }
    getImage = () => this.ImageUrl
    getImageValue =  () => this.ImageValue
}