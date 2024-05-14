const express = require("express");

const routes = express.Router();


const posts = [];
const post = require("../controller/post")

routes.use("/create-post",post.createPost)

routes.post("/", post.addItem)

routes.post("/edit-post", post.updateItem)

routes.post("/edit-post/:postId", post.getDataById)
routes.post("/delete-post/:postId", post.getRemoveById)

module.exports = {adminRoute : routes , posts};