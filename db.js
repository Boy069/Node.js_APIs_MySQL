const mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  port: process.env.MYSQL_PORT,
});

module.exports = connection.promise();dotenv.config();

