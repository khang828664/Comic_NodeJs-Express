"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controller/UserController");
const router = express.Router();
const jsonConfig = bodyParser.json();
// Get All User
router.get('/users/all', async (req, res) => {
    console.log(req.body);
    let result = await userController.GetAllUser();
    res.status(200).json(result);
});
router.get('/users/by/username', jsonConfig, async (req, res) => {
    userController.GetUserByUserName(req, res);
});
router.get('/users/by/condition', jsonConfig, async (req, res) => {
    userController.GetUserByCondition(req, res);
});
router.post('/users/create', jsonConfig, async (req, res) => {
    userController.CreateUser(req, res);
});
router.post('/users/update', jsonConfig, async (req, res) => {
    console.table(req.body);
    userController.UpdateUser(req, res);
});
router.post('/users/delete', jsonConfig, async (req, res) => {
    console.log(req.body);
    userController.DeleteUser(req, res);
});
exports.default = router;
//# sourceMappingURL=user.js.map