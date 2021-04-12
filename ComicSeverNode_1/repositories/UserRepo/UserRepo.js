"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepo_1 = require("../base/BaseRepo");
class UserRepo extends BaseRepo_1.BaseRepository {
    GetUserByUsername(username) {
        try {
            let Options = {
                sort: { "_id": -1 }
            };
            return this._collection.findOne({ Username: username }, Options);
        }
        catch (err) {
            console.log(err.toString());
            return err;
        }
    }
    CountUser() {
        return this._collection.countDocuments();
    }
    GetUserByCondition(param) {
        return this._collection.find(param).toArray();
    }
}
exports.default = UserRepo;
//# sourceMappingURL=UserRepo.js.map