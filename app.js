const express = require("express");

// to join 
const path = require("path");

//create server
const app = express();

// to connect
app.use(express.static(path.join(__dirname, "public")))

const postRoute = require('./route/post');
const adminRoute = require('./route/admin');


//middle ware to check 
app.use((req,res,next) => {
    console.log("i am middle ware one");
    next();
})
app.use("/post",(req,res,next) => {
    console.log("i am Post middleware");
    next();
})
app.use(postRoute);
app.use("/admin",adminRoute);


//server listen
app.listen(8080);