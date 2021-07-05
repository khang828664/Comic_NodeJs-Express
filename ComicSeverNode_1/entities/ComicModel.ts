import { ObjectId, } from "mongodb";
import IBaseModel, { BaseModule } from "./IBaseModel";

interface IComic extends IBaseModel {
    _idUser: ObjectId;
    Name: string;
    Desname: string;
    Tag: string[];
    Author: string[];
    Description: string;
    Chapter: ObjectId[]
    Rate: number;
    Review: ObjectId[];
    View: Number;
    Like: number;
    Dislike: number;
    userBookmark: ObjectId[]
}
export class Comic extends BaseModule implements IComic {
    _idUser: ObjectId;
    Name: string;
    Desname: string;
    Description: string;
    Chapter: ObjectId[]
    Rate: number;
    Review: ObjectId[];
    Tag: string[];
    Author: string[];
    Cover: ObjectId;
    View: number;
    Like: number;
    Dislike: number;
    userBookmark: ObjectId[]
    constructor(comic: IComic) {
        super()
        this.Author = comic.Author
        this.Name = comic.Name
        this.Desname = comic.Desname
        this.Tag = comic.Tag
        this.Author=[...this.Author,...comic.Author]
        this.Description = comic.Description
        this.Chapter = []
        this.Rate = comic.Rate
        this.Review = comic.Review
        this._idUser = comic._idUser
        this.View = 0;
        this.Dislike =0 ; 
        this.Like= 0 ; 
        this.userBookmark = []
    }
    getName = () => this.Name
    setDesname = (param: string) => {
        this.Desname = param
    }
    set_idUser = (param: string) => {
        this._idUser = new ObjectId(param)
    }
    setCover = (_idImage: ObjectId) => {
        this.Cover = _idImage
    }
    get_idUser = () => this._idUser
    setDateUpdate = (param:number) =>{
        this.DateUpdate =  param
    }
}