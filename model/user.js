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
    unique: true,
      required: true,
    minLength :  4
  },
});

module.exports = model("User", userSchema);