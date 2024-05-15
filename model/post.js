const mongoose = require("mongoose");

const { Schema, model } = mongoose

const postSchema = new Schema({
  title: {
    type: String,
    required : true
 },
  description: {
    type: String,
    required : true
 },
  imageUrl: {
    type: String,
    required : true
 }
})
module.exports = model("Post", postSchema);