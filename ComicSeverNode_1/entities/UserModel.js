"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongo = require("mongodb");
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
class User {
    //setUser
    constructor(user) {
        this.Username = new mongo.ObjectId().toHexString();
        this.Password = new mongo.ObjectId().toHexString();
        this.Comicpost = [];
        this.FriendList = [];
        this.IsDelete = false;
        this.DateCreate = new Date().toDateString();
        this.DateUpdate = new Date().toDateString();
        this.getUser = () => (this._id,
            this.Lastname,
            this.Firstname,
            this.Username,
            this.Password,
            this.AvatarLink,
            this.DateCreate,
            this.DateUpdate,
            this.Comicpost,
            this.FriendList);
        this._id = user._id;
        this.Lastname = user.Lastname;
        this.Firstname = user.Firstname;
        this.Username = user.Username;
        this.Password = user.Password;
        this.AvatarLink = user.AvatarLink;
        this.Comicpost = user.Comicpost;
        this.FriendList = user.FriendList;
    }
}
exports.User = User;
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
//# sourceMappingURL=UserModel.js.map