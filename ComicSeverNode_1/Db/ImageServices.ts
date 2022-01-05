import {connect} from './DbConnect'
import {ObjectId } from 'mongodb'
import { Image } from '../entities/ImageModel'

/// Utils Function /// 
const  UtileConnect = async () => {
    let database = await connect()
    return database
}
export const getImage = async (param:ObjectId) => {
    let imageFunction = await UtileConnect()
    let Image = imageFunction.collection(process.env.IMAGE_CHUNK).findOne({files_id:param})
    return Image
} 
export const ImageUploadOne =  async () => {
}

