const posts = [];

const Post = require("../model/post")
exports.createPost = (req, res) => {
  res.render("addPost", {
    title: "post create",
  });
};
exports.renderHomPage = (req, res) => {
  Post.getAllPost().then(([rows]) => {
      res.render("home", {
        title: "home page",
        postArr: rows,
      });
  }).catch((err) => console.log(err));


};

exports.addItem = (req, res) => {
  const { title, desc, photo } = req.body;
  const posts = new Post(title, desc, photo);
  posts.insertData().then((res) => {
    console.log("Insert Successful");
  }).catch((err) => {
    console.log(err);
  })
  console.log(posts);
  res.redirect("/");
};

exports.getDetail = (req, res) => {
  const id = req.params.id;
  Post.getSinglePost(id).then(([row]) => {
    console.log(row[0]);
    res.render("detail", {
      title: "detail page",
      postArr: row[0],
    });
  }).catch((err)=> console.log(err))
    
};