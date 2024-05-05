const express = require("express");

// to join 
const path = require("path");

//create server
const app = express();

// to connect
app.use(express.static(path.join(__dirname, "public")))

//middle ware to check 
app.use((req,res,next) => {
    console.log("i am middle ware one");
    next();
})
app.use("/post",(req,res,next) => {
    console.log("i am Post middleware");
    next();
})

// routes 
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"views","index.html"))
})
app.get("/post", (req, res) => {
    res.sendFile(path.join(__dirname,"views","post.html"))
})
//server listen
app.listen(8080);