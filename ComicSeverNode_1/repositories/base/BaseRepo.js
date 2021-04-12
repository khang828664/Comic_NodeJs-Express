"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(db, collectionName) {
        this._collection = db.collection(collectionName);
    }
    async create(item) {
        const result = await this._collection.insertOne(item);
        return !!result.result.ok;
    }
    async update(id, item) {
        try {
            let filterMethod = await this._collection.findOne({ _id: id });
            let UpdateMethod = {
                $set: item
            };
            let result = await this._collection.updateOne(filterMethod, UpdateMethod);
            return !!result.result.ok;
        }
        catch (err) {
            console.error(err);
        }
    }
    async HardDelete(id) {
        let result = await this._collection.findOneAndDelete({ _id: id }).then(res => true).catch(err => {
            console.log(err.toString());
            return false;
        });
        return result;
    }
    async find() {
        const result = await this._collection.find({}).sort("_id", -1).toArray();
        return result;
    }
    async findOneById(id) {
        const result = await this._collection.findOne({ _id: id });
        return result;
    }
    async findByCondition(param) {
        try {
            const result = await this._collection.find(param).sort("_id", -1).toArray();
            return result;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepo.js.map