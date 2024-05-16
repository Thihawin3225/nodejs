
const Post = require('../model/post');
exports.createPost = (req, res) => {
  res.render("addPost", {
    title: "post create",
  });
};
exports.renderHomPage = (req, res) => {
  Post.find().populate("userId","name").select("title")
    .sort({ title: 1 }).then((post) => {
    res.render("home", {
      title: "home page",
      postArr: post,
    })
  }).catch((err)=> console.log(err))
  
};

exports.addItem = (req, res) => {
  const { title, desc, photo } = req.body;
  Post.create({
    title, description: desc, imageUrl: photo,userId : req.user
  }).then(() => {
    res.redirect("/")
  }).catch((err) => {
    console.log(err);
  })
};

exports.getDetail = (req, res) => {
    const id = req.params.id;
  Post.findById(id).then((result) => {
      res.render("detail", {
        title: "detail page",
        postArr: result,
      });
    }).catch((err)=> console.log(err))
    
};


exports.updateItem = (req, res) => {
  const { title, description, imageUrl, id } = req.body;
  Post.findById(id).then((post) => {
    post.title = title;
      post.description = description;
    post.imageUrl = imageUrl;
    return post.save()
  }).then((result) => {
    res.redirect("/")
  })
    .catch((err) => console.log(err))
}

exports.getDataById = (req, res) => {
  const postId = req.params.postId;

  Post.findById(postId).then((data) => {
    res.render("editPost", {
      title : "editPost",data
    })
  }).catch((err)=> console.log(err))
}

exports.getRemoveById = (req, res) => {
  const id = req.params.postId;
  Post.findByIdAndDelete(id).then(() => {
    res.redirect("/");
  }).catch((err)=> console.log(err))
}