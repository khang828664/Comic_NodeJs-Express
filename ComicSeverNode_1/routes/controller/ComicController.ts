import { Request, Response } from 'express'
import *as mongo from 'mongodb'
import bodyParser = require("body-parser")
import { Comic } from '../../entities/ComicModel'
import *as ComicServices from '../../Db/ComicServices'
import { UploadImage } from "./ImageController"
import { middlewareUpload, connect } from "../middleware/UploadImage"
import { ObjectId } from "mongodb"
import { UserServices } from "../../Db"
import { type } from 'os'
import { ifError } from 'assert'

export async function GetAllComic(req: Request, res: Response) {
    try {
        let comicData: Comic[] = await ComicServices.getComic()
        res.status(200).send({ result: true, data: comicData })
    } catch (err) {
        console.log(err)
        res.status(204).send(err.toString())
    }
}
// export async function GetComicByName(req: Request, res: Response) {
//     let param = req.query
//     console.log(param)
//     if (JSON.stringify(req.query) === "{}") {
//         param = req.body
//     }
//     try {
//         let conditionValue: Comic = Object.create({ DesName: param.desname.toString() })
//         await ComicServices.getComicByDesName(conditionValue)
//             .then((comic: Comic) => {
//                 res.status(200).json({ data: comic })
//             })
//             .catch(error => {
//                 console.error(error)
//                 res.send(error.toString())
//             })
//     } catch (err) {
//         console.error(err)
//         res.send(err)
//     }
//     return
// }
export async function GetComicByIdUser(req: Request, res: Response) {
    let param = req.query
    if (JSON.stringify(param) === "{}") {
        param = req.body
    }
    try {
        let conditionValue: Comic = Object.create({ _idUser: new ObjectId(param._idUser.toString()) })
        await ComicServices.GetUserByCondition(conditionValue).then(
            (comic: Comic[]) => {
                res.status(200).json({ data: comic })
            }
        ).catch()
    } catch (err) {
        console.error(err)
        res.send(err)
    }
    return
}
export async function GetLimit(req: Request, res: Response, next) {
    let { start, end } = req.params
    try {
        if (start.match(/[.*+?^${}()|[\]\\A-Za-z]/g) || end.match(/[.*+?^${}()|[\]\\A-Za-z]/g)) {
            throw new Error("error type of start end");
        } else {
            let result = await ComicServices.GetLimit({ start, end })
            res.json({
                result: true,
                data: result
            })
        }
    } catch (err) {
        res.json({
            result: false,
            data: err.toString()
        })
    }
    return
}
export async function GetComicByCondition(req: Request, res: Response) {
    let param = req.body
    if (JSON.stringify(req.body) === "{}") {
        param = req.query
    }
    await ComicServices.GetUserByCondition(param)
        .then((comic: Comic[]) => {
            res.status(200).json({ data: comic })
        })
        .catch(error => {
            console.error(error)
            res.send(error.toString())
        })
    return
}
//Create new comic
export async function CreateComic(req: Request, res: Response) {
    try {
        //Upload file to local storage 
        await middlewareUpload(req, req.body)
        let comic: Comic = new Comic(req.body)
        comic.set_idUser(req.body._idUser)
        if (comic["_idUser"] !== undefined) {
            console.log("_idUser" in comic)
            // upload file to database
            let _Desname = comic.getName().replace(/ /gi, "_").toUpperCase()
            comic.setDesname(_Desname)
            let result = await ComicServices.UploadCoverImage(req.files, _Desname)
            comic.setCover(new ObjectId(result.ArrayId[0]))
            console.log(result.ArrayId[0])
        } else {
            throw new Error("Empty Id user");
        }

        await ComicServices.CreateComic(comic)
            .then(async response => {
                if (response.toString() !== "") {
                    let result = await ComicServices.getComicById(response)
                    res.status(200).json({
                        result: true,
                        data: result
                    })
                    UserServices.UpdateComicpost(comic._idUser, result._id)
                } else res.status(404).send(
                    {
                        result: false,
                        data: "Can't create username"
                    })
            }).catch(err => { console.log(err) })
    } catch (err) {
        if (err.toString() === "TypeError: Cannot read property 'replace' of undefined") {
            res.send(
                {
                    result: false,
                    data: "unidentified FieldName Check again"
                }
            )
        } else {
            res.send({
                result: false,
                data: err.toString()
            })
        }
    }
    return
}
export async function UpdateComic(req: Request, res: Response) {
    let _id = new mongo.ObjectId(req.body[0]._id)
    let _updateValue: Comic = Object.assign(req.body[1], { DateUpdate: Date.now() })
    let result = await ComicServices.UpdateComic(_id, _updateValue)
    res.send(result)
}
export async function DeleteComic(req: Request, res: Response) {
    try {
        let _id = new mongo.ObjectId(req.body._id)
        let _updateValue: Comic = Object.create({ IsDelete: true })
        let result = await ComicServices.UpdateComic(_id, _updateValue)
        res.send(result)
    }
    catch (err) {
        res.status(404).send(err.toString())
    }
}
export async function HardDeleteComic(req: Request, res: Response) {
    try {
        let _id = new mongo.ObjectId(req.body._id)
        let result = await ComicServices.HardDeleteComic(_id)
        res.send({
            result: result,
            data: []
        })
    }
    catch (err) {
        res.status(404).send({
            result: false,
            data: err.toString()
        })
    }
}

// UploadCover for Comic
// TypeUpload = 0 for cover comic
// TypeUpload = 1 for Avatar or  Cover
export async function UploadCover(req: Request, res: Response) {
    try {
        await middlewareUpload(req, res)
        let typeUpload: string = req.body.typeUpload;
        let ArrayId = await connect(req.files, typeUpload)
        let _id = new mongo.ObjectId(req.body._id)
        console.table(req.body.typeUpload)
        await ComicServices.UpdateComic(_id, { Cover: new mongo.ObjectId(ArrayId.ArrayId[0].toString()) })
        res.json(ArrayId);
    } catch (err) {
        res.send(err)
    }
}
export async function SearchComic(req: Request, res: Response) {
    try {
        let valueSearch = req.body.name
        console.log("Value:" + valueSearch)
        let result = await ComicServices.Search(valueSearch)
        res.json({
            result: true,
            data: result
        })
    } catch (err) {
        res.send({
            result: false,
            data: err
        })
    }
}

export async function SearchComicAuthor(req: Request, res: Response) {
    try {
        let valueSearch = req.body.author
        let result = await ComicServices.SearchAuthor(valueSearch)
        res.json({
            result: true,
            data: result
        })
    } catch (err) {
        res.send({
            result: false,
            data: err
        })
    }
}
export async function GetById(req: Request, res: Response) {
    try {
        let id = req.params._id
        let result = await ComicServices.getComicById(new ObjectId(id))
        res.json({
            result: true,
            data: result
        })
    }
    catch (err) {
        res.send({
            result: false,
            data: err
        })
    }
}
export async function Bookmark(req: Request, res: Response) {
    try {
        let id = req.params._id
        let idUser = req.params.idUser
        await UserServices.UpdateBookmark(new ObjectId(idUser), new ObjectId(id))
        let result = await ComicServices.SetUserBookmark(new ObjectId(id), new ObjectId(idUser))
        res.send(result)

    } catch (error) {
        res.send({
            result: false,
            data: error
        })
    }
}
export async function Like(req: Request, res: Response) {
    /***
     * status:0 = like 
     * status:1 = dislike
     */
    let isLike = parseInt(req.params.status)
    try {
        if (!ObjectId.isValid(req.params._idUser)) {
            res.send({ result: false })
        } else {
            let resultCheck = await UserServices.CheckUser(new ObjectId(req.params._idUser))
            console.log(resultCheck)
            if (resultCheck) {
                await ComicServices.SetLike(new ObjectId(req.params._idComic), isLike)
                res.send({ result: true })
            } else {
                res.send({ result: false })
            }
        }
    } catch (error) {
        res.send({
            result: false,
            Error: error.toString()
        })
    }
}
export async function GetBookmark(req: Request, res: Response) {
    let idUser = req.params._idUser
    try {
        let result = await ComicServices.GetBookmark(new ObjectId(idUser))
        res.json({
            result: true,
            data: result
        })
    } catch (err) {
        res.send({
            result: false,
            error: err.toString()
        })
    }
}
export async function UpdateDate(req, res) {
    try {
        let result = await ComicServices.DemoUpdate()
        res.send(result)

    } catch (err) {
        res.send(err)
    }
}
/**
 * Set Review controller
 */
export async function SetReview(req: Request, res: Response) {
    try {
        console.table(req.body)
        let { userId, comicId, content, username } = req.body
        let datePost = Date.now()
        let result = await ComicServices.
            SetReview(new ObjectId(comicId), new ObjectId(userId), content, datePost, username)
        res.json({
            result: true,
            data: result
        })
    } catch (e) {
        res.json({
            result: false,
            data: e.toString()
        })
    }
}
export async function GetReview(req: Request, res: Response) {
    let comicId = req.params.comicId
    try {
        let result = await ComicServices.GetReview(new ObjectId(comicId))
        res.json({
            result: true,
            data: result
        })
        res.locals
    } catch (e) {
        res.json({
            result: false,
            data: e
        })
        console.log(e)
    }
}
export async function GetComment(req: Request, res: Response) {
    try {
        console.log(`Id comic : ${req.params.comicId}`)
        let ComicId = req.params.comicId
        let result = await ComicServices.GetComment(new ObjectId(ComicId))
        let newResult = []
        result.forEach((item) => {
            let arrayContent: any[] = item.Comment
            arrayContent.forEach((item_1) => {
                if (item_1.ComicId.toString() === ComicId) {
                    let temp = {
                        Username: item.Username,
                        Avatar: item.Avatar,
                        ComicId: item_1.ComicId,
                        Content: item_1.Content,
                        DatePost: item_1.DatePost
                    }
                    newResult.push(temp)
                }
            })
        })
        // sort 
        newResult.sort((a: any, b: any) => b.DatePost - a.DatePost)
        res.json({
            result: true,
            data: newResult
        })
    } catch (e) {
        console.error(e)
        res.json({
            result: false,
            data: e.toString()
        })
    }
}
