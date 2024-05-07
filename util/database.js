const mongodb = require("mongodb");

const mongodbClient = mongodb.MongoClient;
const dotenv = require("dotenv").config();

const mongodbConnector = () => {
    mongodbClient.connect(process.env.MONGODB_URL).then((data) => {
        console.log("database Connect");
        console.log(data);
    }).catch((err) => console.log(err));
}
module.exports = mongodbConnector;