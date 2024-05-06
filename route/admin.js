const express = require("express");

const routes = express.Router();


const posts = [];
const post = require("../controller/post")

routes.use("/create-post",post.createPost)

routes.post("/",post.addItem)
routes.post("/post/:id", post.deleteItem);
routes.get("/post-edit/:id", post.editItem);
routes.post("/update", post.updateItem);
module.exports = {adminRoute : routes , posts};