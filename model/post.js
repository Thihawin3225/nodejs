const db = require("../util/database")
module.exports = class Post{
    constructor(title,description,image_url) {
        this.title = title;
        this.description = description;
        this.image_url = image_url
    }

    static getAllPost() {
        return db.execute("SELECT * FROM post");
    }

    static getSinglePost(id) {
        return db.execute("SELECT * FROM post WHERE post.id = ?",[id])
    }

    insertData() {
        return db.execute("INSERT INTO post(title,description,image_url) VALUES (?,?,?)", [
            this.title,
            this.description,
            this.image_url
        ])
    }
}