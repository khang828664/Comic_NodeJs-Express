"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
// importing mongoClient to connect at mongodb
const dotenv = require("dotenv");
const mongodb_1 = require("mongodb");
dotenv.config();
// creating a function that execute self runs
async function connect() {
    try {
        const connection = await mongodb_1.MongoClient.connect(process.env.BASE_URL);
        const db = connection.db(process.env.DATA_NAME);
        return db;
    }
    catch (err) {
        return err;
        console.log(err.toString());
    }
}
exports.connect = connect;
//# sourceMappingURL=DbConnect.js.map