
import { ObjectId } from 'mongodb'
import *as mongo from 'mongodb'
import IBaseModel, { BaseModule } from './IBaseModel'

interface IUser extends IBaseModel {
    Lastname: string
    Firstname: string
    Username: string
    Password: string
    Avatar: string
    Cover :string 
    SortDescription : string
    Comicpost: ObjectId[]
    FriendList: ObjectId[]
    Follower: ObjectId[]
    ReviewId: ObjectId[]
    Comment:Object[]
    Bookmark:ObjectId[]
}
export class User extends BaseModule implements IUser {
    Lastname: string
    Firstname: string
    Username: string = new ObjectId().toHexString()
    Password: string = new ObjectId().toHexString()
    Avatar: string
    Cover:string
    Comicpost: ObjectId[] = []
    FriendList: ObjectId[] = []
    SortDescription: string
    Follower: ObjectId[]=[]
    ReviewId: ObjectId[]=[]
    Comment: Object[]=[]
    Bookmark:ObjectId[]=[]

    //setUser
    constructor(user: IUser) {
        super()
        this.Lastname = user.Lastname
        this.Firstname = user.Firstname
        this.Username = user.Username
        this.Password = user.Password
        this.Avatar = (user.Avatar)?user.Avatar:""
        this.Cover =(user.Cover)?user.Cover:""
        this.SortDescription = (user.SortDescription)?user.SortDescription:""
        this.Comment=[]
    }
    public setComicPost (param :ObjectId) {
        this.Comicpost.push(param)
    }
}