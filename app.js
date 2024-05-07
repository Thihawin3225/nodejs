const express = require("express");

const bodyPraser = require("body-parser");

// to join 
const path = require("path");

//create server
const app = express();

// to connect
app.use(express.static(path.join(__dirname, "public")))

const postRoute = require('./route/post');
const {adminRoute} = require('./route/admin');

app.use(bodyPraser.urlencoded({ extended: false }));


// to use ejs
app.set("view engine", "ejs");
app.set("views", "views");

const sequelize = require('./util/database');

const Post = require("./model/post");
const User = require("./model/user");
// call user any where
app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user;
        next();
    }).catch((err)=> console.log(err))
})
//middle ware to check 
app.use((req,res,next) => {
    console.log("i am middle ware one");
    next();
})
app.use("/post",(req,res,next) => {
    console.log("i am Post middleware");
    next();
})
app.use("/admin", (req, res,next) => {
    console.log("Admin Prove!");
    next()
})
app.use(postRoute);
app.use("/admin", adminRoute);
//connect two database
Post.belongsTo(User, {
    constraints : true,
  onDelete: "cascade",
});
User.hasMany(Post);
//testing database
sequelize
  .sync()
  .then((res) => {
      User.findByPk(1).then((user)=> {
          if (!user) {
             return User.create({
                  name: "Mg Mg",
                  email : "abc@gmail.com"
              })
          }
          return user;
      })
  }).then((suc) => {
            app.listen(8080);
  })
  .catch((err) => console.log(err));
//server listen
