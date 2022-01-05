import { ObjectId } from "mongodb";
import IBaseModel,{BaseModule} from "./IBaseModel";

interface IChapter extends  IBaseModel {
    _idComic: ObjectId;
    ChapterIndex:number; 
    Description :string;
    Image : ObjectId[];
    review:string
    Comment:string
}
export class Chapter extends BaseModule implements IChapter {
  
    constructor (comic:IChapter)  {
        super()
        this.ChapterIndex = comic.ChapterIndex
        this.Description = comic.Description
        this.Image = comic.Image
        this._idComic = new ObjectId(comic._idComic)
    } 
    _idComic: ObjectId;
    ChapterIndex: number;
    Description: string;
    Image: ObjectId[];
    review: string;
    Comment: string;
    set_IdComic (param :ObjectId) {
        this._idComic = param
    }
    set_IdImage (param: any) {
        this.Image = param
    }
    set_perImageValue  (param:any) {
        this.Image.push(param)
    }
}
