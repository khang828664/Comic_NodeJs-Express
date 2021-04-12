
import * as mongo from 'mongodb'
import IBaseModel from './IBaseModel'
type IUserPostComic =  {
    Comicpost: IComic
}
type IComic = {
    name: string
    comic_id: mongo.ObjectId
}
interface IUser extends IBaseModel {
    _id: mongo.ObjectId 
    Lastname: string 
    Firstname: string 
    Username: string 
    Password: string
    AvatarLink: string
    Comicpost: IUserPostComic[]
    FriendList: mongo.ObjectID[]

    
}
// const dataDefaultValue: IUser = {
//     Lastname:"",
//     Firstname:"",
//     AvatarLink:"",
//     IsDelete: false,
//     DateCreate: new Date().toDateString(),
//     DateUpdate: new Date().toDateString(),
//     Username: new mongo.ObjectId().toHexString(),
//     Password: new mongo.ObjectId().toHexString(),
//     FriendList:[],
//     Comicpost:[]
// }
// export class User {
//     private UserData: IUser
//     constructor(User: IUser) {
//         this.UserData = { ...dataDefaultValue,...User }
//      }

//  }
export class User implements IUser{
    _id: mongo.ObjectID
    Lastname: string 
    Firstname: string 
    Username: string = new mongo.ObjectId().toHexString()
    Password: string = new mongo.ObjectId().toHexString()
    AvatarLink: string
    Comicpost: IUserPostComic[] =[]
    FriendList: mongo.ObjectID[] =[]
    IsDelete: boolean = false
    DateCreate: string =  new Date().toDateString()
    DateUpdate: string =  new Date().toDateString()
    //setUser
    constructor (user:IUser) {
      this._id = user._id
      this.Lastname = user.Lastname
      this.Firstname = user.Firstname
      this.Username = user.Username
      this.Password = user.Password
      this.AvatarLink=user.AvatarLink
      this.Comicpost=user.Comicpost
      this.FriendList=user.FriendList

    }
  
    getUser = () => (
            this._id,
            this.Lastname,
            this.Firstname,
            this.Username,
            this.Password,
            this.AvatarLink,
            this.DateCreate,
            this.DateUpdate,
            this.Comicpost,
            this.FriendList
    )
        
}
//  export const User : IUser = {
//     _id:null,
//     Lastname:"",
//     Firstname:"",
//     AvatarLink:"",
//     IsDelete: false,
//     DateCreate: new Date().toDateString(),
//     DateUpdate: new Date().toDateString(),
//     Username: "",
//     Password: "",
//     FriendList:[],
//     Comicpost:[]
//  }
