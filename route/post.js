const express = require("express");

const routes = express.Router();

const path = require("path");
const post = require("../controller/post")

// routes 
routes.get("/", post.renderHomPage)
routes.get("/post/:id", post.getDetail )

module.exports = routes;