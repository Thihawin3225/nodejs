

const Post = require('../model/post');
exports.createPost = (req, res) => {
  res.render("addPost", {
    title: "post create",
  });
};
exports.renderHomPage = (req, res) => {
  Post.getPosts().then((post) => {
    res.render("home", {
      title: "home page",
      postArr : post
    })
  }).catch((err)=> console.log(err))
  
};

exports.addItem = (req, res) => {
  const { title, desc , photo } = req.body;
  const post = new Post(title, desc, photo);
  post.create().then((result) => {
    res.redirect("/")
  }).catch((err) => {
    console.log(err);
  })
};

exports.getDetail = (req, res) => {
    const id = req.params.id;
  Post.getPost(id).then((result) => {
      res.render("detail", {
        title: "detail page",
        postArr: result,
      });
    }).catch((err)=> console.log(err))
    
};


exports.updateItem = (req, res) => {
  const { title, description, imageUrl, id } = req.body;
  console.log(id);
  const post = new Post(title, description, imageUrl, id);
  post.create().then((ress) =>{
    console.log("update success")
    res.redirect("/");
   }).catch((err)=> console.log(err))
}

exports.getDataById = (req, res) => {
  const postId = req.params.postId;

  Post.getPost(postId).then((data) => {
    res.render("editPost", {
      title : "editPost",data
    })
  }).catch((err)=> console.log(err))
}

exports.getRemoveById = (req, res) => {
  const id = req.params.postId;
  Post.delete(id).then(() => {
    res.redirect("/");
  }).catch((err)=> console.log(err))
}