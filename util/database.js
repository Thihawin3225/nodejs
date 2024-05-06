const Sequelize = require("sequelize");

const sequelize = new Sequelize('blognode', 'root', '',{
  host: 'localhost',
  dialect: "mysql",
});

module.exports = sequelize;