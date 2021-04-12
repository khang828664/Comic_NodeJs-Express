import { User } from "../../entities/UserModel";

export interface IUserRepoInterface  {
    CountUser() : Promise<number>
    GetUserByUsername(username:string):Promise<User>
    GetUserByCondition({...param}):Promise<User[]>
}