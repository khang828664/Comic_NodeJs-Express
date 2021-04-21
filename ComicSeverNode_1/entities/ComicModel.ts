import { ObjectId } from "mongodb";
import IBaseModel,{BaseModule} from "./IBaseModel";

interface IComic extends  IBaseModel {
    _idUser: ObjectId;
    Name:string; 
    Desname :string;
    Tag : string [];
    Author:string [];
    Description:string;
    Chapter: ObjectId[] 
    Rate : number;
    Review:  ObjectId[];
}
export class Comic extends BaseModule implements IComic {
    _idUser: ObjectId;
    Name:string; 
    Desname :string;
    Description:string;
    Chapter: ObjectId[] 
    Rate : number;
    Review:  ObjectId[];
    Tag: string[];
    Author: string[];
    constructor (comic:IComic)  {
    super()
    this.Author = comic.Author
    this.Name=comic.Name
    this.Desname = comic.Desname
    this.Tag = comic.Tag
    this.Author = comic.Author
    this.Description = comic.Description
    this.Chapter = comic.Chapter
    this.Rate =  comic.Rate
    this.Review = comic.Review
    } 
    getName = () => this.Name
    setDesname =(param:string)=>
    {
        this.Desname = param
    }
    set_idUser = (param:string) => {
        this._idUser = new ObjectId(param)
    }
}