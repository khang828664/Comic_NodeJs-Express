
import {ObjectId} from 'mongodb'
import IBaseModel,{BaseModule} from './IBaseModel'

interface IUser extends IBaseModel {
    Lastname: string 
    Firstname: string 
    Username: string 
    Password: string
    AvatarLink: string
    Comicpost: ObjectId[]
    FriendList: ObjectId[]
}
export class User extends  BaseModule  implements IUser {
    Lastname: string 
    Firstname: string 
    Username: string = new ObjectId().toHexString()
    Password: string = new ObjectId().toHexString()
    AvatarLink: string
    Comicpost: ObjectId[] = []
    FriendList:ObjectId[] =[]
    DateUpdate: string =  new Date().toDateString()
    //setUser
    constructor (user:IUser) {
        super()
      this.Lastname = user.Lastname
      this.Firstname = user.Firstname
      this.Username = user.Username
      this.Password = user.Password
      this.AvatarLink=user.AvatarLink
      this.Comicpost=user.Comicpost
      this.FriendList=user.FriendList

    }   
}