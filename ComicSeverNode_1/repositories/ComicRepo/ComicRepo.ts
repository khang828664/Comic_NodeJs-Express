import { Comic } from "../../entities/ComicModel"
import { BaseRepository } from "../base/BaseRepo"
import *as fs from 'fs'
import { FindOneOptions, GridFSBucket, ObjectID, UpdateQuery, FilterQuery } from 'mongodb'

export default class ComicRepo extends BaseRepository<Comic>{


    UploadCoverImageToDatabase(filePath, reqBody) {
        let Name: string = reqBody
        try {
            let bucket = new GridFSBucket(this._Db, { bucketName: "ImageCover" })
            let NameImage: string[] = []
            let ArrayId: string[] = []

            /// Upload many file to database 
            if (filePath) {
                filePath.map((value, index) => {
                    let nameImage = index.toString() + Name + Date.now().toString()
                    let uploadStream = bucket.openUploadStream(nameImage)
                    fs.createReadStream(value.path.toString(), { autoClose: true }).pipe(uploadStream)
                    let id = uploadStream.id.toString()
                    NameImage.push(nameImage)
                    ArrayId.push(id)
                })
                let ObjectA = Object.create({ NameImage: NameImage, ArrayId: ArrayId })
                return ObjectA
            } else {
                return {}
            }
        } catch (err) {
            console.error(err)
            return err
        }
    }
    GetUserByUsername(username: string): Promise<Comic> | undefined {
        try {
            let Options: FindOneOptions<Comic> = {
                sort: { "_id": -1 }
            }
            return this._collection.findOne<Comic>({ Username: username }, Options)
        } catch (err) {
            console.log(err.toString())
            return err
        }
    }
    CountUser(): Promise<number> {
        return this._collection.countDocuments()
    }
    GetUserByCondition(param): Promise<Comic[]> {
        return this._collection.find(param,).toArray()
    }
    async GetComicById(id: ObjectID) {
        let result = await this._collection.findOne({ _id: id })
        let update: UpdateQuery<Comic> = {
            $inc: {
                View: 1
            }
        }
        await this._collection.updateOne({ _id: id }, update)
        return result
    }
    async searchComic(value: string) {
        let fillerQuery: FilterQuery<Comic> = {

            $or: [
                { Name: { $regex: value, $options: 'i' } },
                { Name: value }
            ]


        }
        let result = await this._collection.find(fillerQuery).sort("DateUpdate", -1).toArray()
        return result
    }
    async searchComicAuthor(value: string) {
        let fillerQuery: FilterQuery<Comic> = {
            Author: { $elemMatch: { $regex: value, $options: 'i' } }
        }
        let result = await this._collection.find(fillerQuery).toArray()
        return result
    }
    async setBookmark(id: ObjectID, idUser: ObjectID) {
        let fillerQuery: FilterQuery<Comic> = {
            UserBookmark: { $all: [idUser] },
            _id: id
        }
        let checkResult = await this._collection.findOne(fillerQuery)
        if (checkResult) {
            await this._collection.updateOne({ _id: id },
                { $pull: { "UserBookmark": { $in: [idUser] } } })
            return false
        } else {
            try {
                let UpdateMethod = {
                    $push: {
                        "UserBookmark": idUser
                    }
                }
                let result = await this._collection.updateOne({ _id: id }, UpdateMethod);
                return !!result.result.ok
            } catch (err) {
                return (err)
            }
        }
    }
    async setLike(id: ObjectID, isLike: number) {
        let result = await this._collection.findOne({ _id: id })
        let update: UpdateQuery<Comic> = null
        if (isLike == 0) {
            update = {
                $inc: {
                    Like: 1
                },
            }
        }
        if (isLike == 1) {
            update = {
                $inc: {
                    Dislike: 1
                },
            }
        }
        await this._collection.updateOne({ _id: id }, update)
        return result
    }
    async getBookmark(idUser: ObjectID) {
        let findOption = {
            projection: {
                Description: false,
                Desname: false,
                DateCreate: false,
                DateUpdate: false,
                UserBookmark: false,
                Review: false,
                _idUser: false,
                Chapter: false
            }
        }
        try {
            let result = await this._collection.find({
                UserBookmark: { $in: [idUser] }
            }, findOption).toArray()
            return result
        } catch (err) {
            return err
        }
    }
    async updateDateComic() {
        try {
            return await this._collection.updateMany({
            }, {
                $set: {
                    DateUpdate: Date.now()
                }
            })
        } catch (err) {
            return err
        }
    }
}