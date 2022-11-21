import { MongoClient } from "mongodb";
import bodyParser from 'body-parser';
import express from 'express'
import dotenv from 'dotenv'
import { sendResponse } from "../../responseJson";
dotenv.config()
const jsonParser = bodyParser.json()
const EXAMPLEROUTER = express.Router()

const DBUser = process.env.DB_USER || "";
const DBPassword = process.env.DB_PASSWORD || "";
const url = `mongodb+srv://${DBUser}:${DBPassword}@uve-database.nno1qlo.mongodb.net/?retryWrites=true&w=majority`;

EXAMPLEROUTER.get("/", async (req, res, next) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const data = await client.db("<DB>").collection("<COLLECTION>").find()
        const dataArray = await data.toArray()
        client.close();

        sendResponse(req, res, 200, "EXAMPLE TITLE", 1, dataArray ? dataArray : {})
    } catch (err) {
        sendResponse(req, res, 500, "EXAMPLE TITLE", 1, null, err)
    }
})

export default EXAMPLEROUTER