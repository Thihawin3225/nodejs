const Sequelize = require("sequelize")
const db = require("../util/database");

const Post = db.define('post', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
    },
    title: {
        type : Sequelize.STRING,
    },
    description: Sequelize.STRING,
    image_url: {
        type : Sequelize.STRING
    }
})

module.exports = Post;