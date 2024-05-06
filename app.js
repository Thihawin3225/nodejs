const express = require("express");

const bodyPraser = require("body-parser");

// to join 
const path = require("path");

//create server
const app = express();

// to connect
app.use(express.static(path.join(__dirname, "public")))

const postRoute = require('./route/post');
const {adminRoute} = require('./route/admin');

app.use(bodyPraser.urlencoded({ extended: false }));


// to use ejs
app.set("view engine", "ejs");
app.set("views", "views");

const sequelize = require('./util/database');

//middle ware to check 
app.use((req,res,next) => {
    console.log("i am middle ware one");
    next();
})
app.use("/post",(req,res,next) => {
    console.log("i am Post middleware");
    next();
})
app.use("/admin", (req, res,next) => {
    console.log("Admin Prove!");
    next()
})
app.use(postRoute);
app.use("/admin",adminRoute);

//testing database
sequelize
  .sync()
  .then((res) => {
      console.log("successful Connection");
      app.listen(8080);
  })
  .catch((err) => console.log(err));
//server listen
