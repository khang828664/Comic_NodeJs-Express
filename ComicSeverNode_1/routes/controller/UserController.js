"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.CreateUser = exports.GetUserByCondition = exports.GetUserByUserName = exports.GetAllUser = void 0;
const mongo = require("mongodb");
const UserModel_1 = require("../../entities/UserModel");
const UserServices = require("../../Db/UserServices");
//Function map object
async function GetAllUser() {
    return await UserServices.getUser();
}
exports.GetAllUser = GetAllUser;
async function GetUserByUserName(req, res) {
    let param = req.query;
    console.log(param);
    if (JSON.stringify(req.query) === "{}") {
        param = req.body;
    }
    try {
        await UserServices.getUserByUserName(param.username.toString())
            .then((user) => {
            res.status(200).json(user);
        })
            .catch(error => {
            console.error(error);
            res.send(error.toString());
        });
    }
    catch (err) {
        console.error(err);
        res.send(err.toString());
    }
}
exports.GetUserByUserName = GetUserByUserName;
async function GetUserByCondition(req, res) {
    console.log(req.body);
    //setTimeout(() => {
    //    console.log(TIMEOUT)
    //    res.status(404).send(TIMEOUT)
    //    return
    //}, 3000);
    let param = req.body;
    if (JSON.stringify(req.body) === "{}") {
        param = req.query;
    }
    await UserServices.GetUserByCondition(param)
        .then((user) => {
        res.status(200).json(user);
    })
        .catch(error => {
        console.error(error);
        res.send(error.toString());
    });
    return;
}
exports.GetUserByCondition = GetUserByCondition;
async function CreateUser(req, res) {
    console.log(req.body);
    const user = new UserModel_1.User(req.body);
    console.table(user);
    await UserServices.CreateUser(user)
        .then(async (response) => {
        if (response) {
            let result = await UserServices.getUserByUserName(req.body.Username.toString());
            res.status(200).json(result);
            res.status(200).send(response);
        }
        else
            res.status(404).send("Can create username");
    }).catch(err => { console.log(err); });
    return;
}
exports.CreateUser = CreateUser;
async function UpdateUser(req, res) {
    let _id = new mongo.ObjectId(req.body[0]._id);
    let _updateValue = req.body[1];
    let result = await UserServices.UpdateService(_id, _updateValue);
    res.send(result);
}
exports.UpdateUser = UpdateUser;
async function DeleteUser(req, res) {
    try {
        let _id = new mongo.ObjectId(req.body._id);
        let _updateValue = Object.create({ IsDelete: true });
        let result = await UserServices.UpdateService(_id, _updateValue);
        res.send(result);
    }
    catch (err) {
        res.status(404).send(err.toString());
    }
}
exports.DeleteUser = DeleteUser;
//# sourceMappingURL=UserController.js.map