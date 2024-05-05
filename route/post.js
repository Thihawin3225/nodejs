const express = require("express");

const routes = express.Router();

const path = require("path");
// routes 
routes.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"..","views","index.html"))
})
routes.get("/post", (req, res) => {
    res.sendFile(path.join(__dirname,"..","views","post.html"))
})

module.exports = routes;