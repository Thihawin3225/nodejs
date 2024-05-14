const mongodb = require("mongodb");

const mongodbClient = mongodb.MongoClient;
const dotenv = require("dotenv").config();

let db;
const mongodbConnector = () => {
    mongodbClient.connect(process.env.MONGODB_URL).then((data) => {
        console.log("database Connect");
        db = data.db();
    }).catch((err) => console.log(err));
}
const getDatabase = () => {
    if (db) {
        return db;
    }
    throw "no Database";
}

module.exports = {mongodbConnector , getDatabase};