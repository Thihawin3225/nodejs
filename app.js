const express = require("express");

const bodyPraser = require("body-parser");

// to join 
const path = require("path");

//create server
const app = express();


const mongoose = require('mongoose');

const User = require('./model/user')
// to connect
app.use(express.static(path.join(__dirname, "public")))

const postRoute = require('./route/post');
const {adminRoute} = require('./route/admin');
const dotenv = require("dotenv").config();
app.use(bodyPraser.urlencoded({ extended: false }));

const authRoute = require("./route/auth")
// to use ejs
app.set("view engine", "ejs");
app.set("views", "views");


app.use((req, res, next) => {
    User.findById("664446f06cf07c1ade93aba2").then((user) => {
        req.user = user;
        next();
    })
    
})

app.use(authRoute);
app.use(postRoute);
app.use("/admin",adminRoute);



mongoose.connect(process.env.MONGODB_URL).then(_=> {
    app.listen(8080);
    console.log("Database connected with mongoose");
  return User.findOne().then((user) => {
    if (!user) {
      User.create({
        userName: "Thiha win",
        email: "thihawin@gamil.com",
        password: "thihawin",
      });
    }
    return user;
  }); 
}).then((result) => {
    console.log(result);
}).catch((err) => console.log(err));
//server listen
