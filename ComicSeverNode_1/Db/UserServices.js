"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateService = exports.HardDeleteUser = exports.CreateUser = exports.numberOfUser = exports.GetUserByCondition = exports.getUserByUserName = exports.getUser = void 0;
const DbConnect_1 = require("./DbConnect");
const index_1 = require("../repositories/index");
/// Utils Function /// 
const UtileConnect = async () => {
    const database = await DbConnect_1.connect();
    const userRepo = new index_1.UserRepo(database, process.env.USER);
    return userRepo;
};
const getUser = async () => {
    const userFunction = await UtileConnect();
    const listUser = await userFunction.find();
    return listUser;
};
exports.getUser = getUser;
const getUserByUserName = async (parma) => {
    const userFunction = await UtileConnect();
    const user = await userFunction.GetUserByUsername(parma);
    return user;
};
exports.getUserByUserName = getUserByUserName;
const GetUserByCondition = async (param) => {
    const userFunction = await UtileConnect();
    const user = await userFunction.findByCondition(param);
    return user;
};
exports.GetUserByCondition = GetUserByCondition;
const numberOfUser = async () => {
    const userFunction = await UtileConnect();
    const value = await userFunction.CountUser();
    return value;
};
exports.numberOfUser = numberOfUser;
const CreateUser = async (param) => {
    const userFunction = await UtileConnect();
    const value = await userFunction.create(param);
    return value;
};
exports.CreateUser = CreateUser;
const HardDeleteUser = async () => {
};
exports.HardDeleteUser = HardDeleteUser;
const UpdateService = async (_id, param) => {
    const userFunction = await UtileConnect();
    const value = await userFunction.update(_id, param);
    return value;
};
exports.UpdateService = UpdateService;
//# sourceMappingURL=UserServices.js.map