// importing mongoClient to connect at mongodb
require('dotenv').config()
import { MongoClient, MongoTimeoutError } from 'mongodb';
import express = require ("express")
import * as mongo from "mongodb"
import {User} from   '../entities/UserModel'
import path = require('path');

// creating a function that execute self runs

export  async function  connect (): Promise<mongo.Db>  {
    try {
        const connection  = await MongoClient.connect(process.env.CONNECTINGSTRING)
        const db = connection.db(process.env.DATA_NAME)
        return db 
        }
    catch(err){
        console.log(`Connection Error value:${err.toString()}`)
        return err
    }
}
