// importing mongoClient to connect at mongodb
require('dotenv').config()
import { MongoClient } from 'mongodb';
import express = require ("express")
import * as mongo from "mongodb"
// creating a function that execute self runs

export  async function  connect (): Promise<mongo.Db>  {
    try {
        console.log(`current connection string : ${process.env.BASE_URL}`)
        const connection  = await MongoClient.connect(process.env.BASE_URL)
        const db = connection.db(process.env.DATA_NAME)
        return db 
        }
    catch(err){
        console.log(`Connection Error value:${err.toString()}`)
        return err
    }
}
