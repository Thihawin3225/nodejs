const mongoose = require("mongoose")

const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
        required: true,
        minLength: 4,
    maxLength : 15
  },

  email: {
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