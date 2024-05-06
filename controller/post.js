const posts = [];

const Post = require("../model/post")
exports.createPost = (req, res) => {
  res.render("addPost", {
    title: "post create",
  });
};
exports.renderHomPage = (req, res) => {

  Post.findAll().then((row) => {
    res.render("home", {
      title: "home page",
      postArr: row,
    });
  }).catch((err) => console.log(err));


};

exports.addItem = (req, res) => {
  const { title, desc, photo } = req.body;
  Post.create({
    title,
   description : desc,
   image_url : photo
  }).then((data) => {
    console.log("Insert Successful");
    res.redirect("/");
  }).catch((err) => {
    console.log(err);
  })
  
};

exports.getDetail = (req, res) => {
  const id = req.params.id;
  Post.findOne({ where: { id: id } }).then((row) => {
    console.log(row);
    res.render("detail", {
      title: "detail page",
      postArr: row,
    });
  }).catch((err)=> console.log(err))
    
};