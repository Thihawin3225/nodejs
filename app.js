const express = require("express");

const bodyPraser = require("body-parser");

// to join 
const path = require("path");

//create server
const app = express();

const session = require("express-session")
const mongoose = require('mongoose');

const csrf = require("csurf");
const csrfProtect = csrf();

const mongodbStore = require("connect-mongodb-session")(session);



const User = require('./model/user')
// to connect
app.use(express.static(path.join(__dirname, "public")))

const postRoute = require('./route/post');
const {adminRoute} = require('./route/admin');
const dotenv = require("dotenv").config();
app.use(bodyPraser.urlencoded({ extended: false }));

const authRoute = require("./route/auth")
const {isLogin} = require("./middleware/isLogin")
// to use ejs
app.set("view engine", "ejs");
app.set("views", "views");

const store = new mongodbStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
app.use(
  session({
      secret: process.env.SESSION_KEY,
      store : store,
      resave: false,
      saveUninitialized: false,
        
  })
);



app.use(csrfProtect);
app.use((req, res,next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isLogin = req.session.isLogin ? true : false;
  next();
})
app.use((req, res, next) => {

  if (req.session.isLogin === undefined) {
    return next();
  }
  User.findById(req.session.userInfo._id).
    select("_id name").then((user) => {
      req.user = user;
        next();
    })
    
})
app.use(authRoute);
app.use("/admin", isLogin, adminRoute);
app.use(postRoute);


mongoose.connect(process.env.MONGODB_URL).then(_=> {
    app.listen(8080);
    console.log("Database connected with mongoose");
})
