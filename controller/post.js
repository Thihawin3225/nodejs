const posts = [];
exports.createPost = (req, res) => {
  res.render("addPost", {
    title: "post create",
  });
};
exports.renderHomPage = (req, res) => {
  res.render("home", {
    title: "home page",
    postArr: posts,
  });
};

exports.addItem = (req, res) => {
  const { title, desc , photo } = req.body;
    posts.push({
      id : Math.random(),
    title,
        desc,
    photo
  });
  console.log(posts);
  res.redirect("/");
};

exports.getDetail = (req, res) => {
    const id = req.params.id;
    const postData = posts.find((res) => {
        return res.id == id;
    })
    console.log(postData);
    res.render("detail", {
      title: "detail page",
      postArr : postData
  });
};