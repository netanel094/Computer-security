const mysql = require('mysql2');
require('dotenv').config();

const Password = process.env.DB_PASSWORD;
const userName = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

// Create a connection to the MySQL server
const connectionPromise = mysql.createConnection({
  host: dbHost,
  user: userName,
  password: Password,
  database: dbName,
});

const checkConnection = async (con) => {
  con.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected!');
    }
  });
};
module.exports = { connectionPromise };

checkConnection(connectionPromise);
