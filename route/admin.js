const express = require("express")

const routes = express.Router();

const path = require("path");

routes.use("/create-post",(req,res) => {
    res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
})

module.exports = routes;