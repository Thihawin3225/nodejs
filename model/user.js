const mongoose = require("mongoose")

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  tokenExipred : Date,
});

module.exports = model("User", userSchema);