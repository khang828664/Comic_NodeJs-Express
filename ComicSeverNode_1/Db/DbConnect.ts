// importing mongoClient to connect at mongodb
import *as dotenv from 'dotenv'
import { MongoClient, MongoTimeoutError } from 'mongodb';
import express = require ("express")
import * as mongo from "mongodb"
import {User} from   '../entities/UserModel'
dotenv.config()
// creating a function that execute self runs

export  async function  connect (): Promise<mongo.Db>  {
    try {
        const connection  = await MongoClient.connect(process.env.BASE_URL)
        const db = connection.db(process.env.DATA_NAME)
        return db 
        }
    catch(err){
        return err
        console.log(err.toString())
    }
}
