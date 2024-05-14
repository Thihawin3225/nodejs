const { getDatabase } = require("../util/database");
const mongodb = require("mongodb");

class Post {
  constructor(title, description, imageUrl, id) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  create() {
    const db = getDatabase();
    if (this._id) {
      // Update existing post
      return db
        .collection("post")
        .updateOne(
          { _id: this._id }, // Filter based on _id
          {
            $set: {
              title: this.title,
              description: this.description,
              imageUrl: this.imageUrl,
            },
          }
        )
        .then((result) => {
          console.log("Post updated successfully");
          return result;
        })
        .catch((err) => {
          console.error("Error updating post:", err);
        });
    } else {
      // Create new post
      return db
        .collection("post")
        .insertOne(this)
        .then((result) => {
          console.log("Post created successfully");
          return result;
        })
        .catch((err) => {
          console.error("Error creating post:", err);
        });
    }
  }

  static getPosts() {
    const db = getDatabase();
    return db
      .collection("post")
      .find()
      .toArray()
      .then((posts) => {
        return posts;
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }

  static delete(postId) {
    const db = getDatabase();
    return db
      .collection("post")
      .deleteOne({ _id: new mongodb.ObjectId(postId) })
      .then((result) => {
        console.log("Post deleted successfully");
        return result;
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
      });
  }
  static getPost(postId) {
    const db = getDatabase();
    return db
      .collection("post")
      .findOne({ _id: new mongodb.ObjectId(postId) })
      .then((post) => {
        return post;
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
      });
  }
}

module.exports = Post;
