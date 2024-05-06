const mysql = require("mysql2");

const pool = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "",
    database : "blognode"
    
})
module.exports = pool.promise();