const express = require("express");

const routes = express.Router();

const path = require("path");

const posts = [];

routes.use("/create-post",(req,res) => {
    res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
})

routes.post("/", (req, res) => {
    const { title, desc } = req.body;
    posts.push({
        title,
        desc
    })
    console.log(posts);
    res.redirect('/');
})

module.exports = {adminRoute : routes , posts};