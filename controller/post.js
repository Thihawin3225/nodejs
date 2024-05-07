

const Post = require("../model/post")
exports.createPost = (req, res) => {
  res.render("addPost", {
    title: "post create",
  });
};
exports.renderHomPage = (req, res) => {

  Post.findAll(
    {
      order: [
        [
          "createdAt", "desc",
        ]
      ]
    }
  ).then((row) => {
    res.render("home", {
      title: "home page",
      postArr: row,
    });
  }).catch((err) => console.log(err));


};

exports.addItem = (req, res) => {
  const { title, desc, photo } = req.body;
  req.user.createPost({
    title,
   description : desc,
    image_url: photo,
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
    res.render("detail", {
      title: "detail page",
      postArr: row,
    });
  }).catch((err)=> console.log(err))
    
};

exports.deleteItem = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((data) => {
      if (!data) {
        res.redirect("/");
      }
      return data.destroy();
    })
    .then((data) => {
      console.log("destroy is successful");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
}

exports.editItem = ((req, res) => {
  const id = req.params.id;
  Post.findByPk(id).then((data) => {
    res.render("edit", { title: "edit Page", postArr : data });
  })
  
})
exports.updateItem = (req, res) => {
  const { id ,title,  desc, photo } = req.body; // Get the updated data from the request body
  //Find the post by ID
  Post.findByPk(id)
    .then((post) => {
      if (!post) {
        // If post not found, redirect to home page or display an error
        res.redirect("/");
      } else {
        // Update the post attributes with new values
        post.title = title;
        post.description = desc;
        post.image_url = photo;

        // Save the changes to the database
        return post.save();
      }
    })
    .then((updatedPost) => {
      // Redirect to the home page or display a success message
      console.log("Update successful");
      res.redirect("/");
    })
    .catch((err) => {
      // Handle errors
      console.error("Error updating post:", err);
    });
};
