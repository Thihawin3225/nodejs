const express = require("express");

const routes = express.Router();


const posts = [];
const post = require("../controller/post")

routes.use("/create-post",post.createPost)

routes.post("/",post.addItem)

module.exports = {adminRoute : routes , posts};