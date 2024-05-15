const express = require("express");

const bodyPraser = require("body-parser");

// to join 
const path = require("path");

//create server
const app = express();


const mongoose = require('mongoose');
// to connect
app.use(express.static(path.join(__dirname, "public")))

const postRoute = require('./route/post');
const {adminRoute} = require('./route/admin');
const dotenv = require("dotenv").config();
app.use(bodyPraser.urlencoded({ extended: false }));


// to use ejs
app.set("view engine", "ejs");
app.set("views", "views");


app.use(postRoute);
app.use("/admin",adminRoute);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(8080);
    console.log("Database connected with mongoose");
}).catch((err)=> console.log(err));
//server listen
