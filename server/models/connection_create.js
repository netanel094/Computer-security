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
  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

(async () => {
  try {
    const isConnected = await checkConnection(connectionPromise);
    console.log(`Connected to MySQL server: ${isConnected}`);
  } catch (error) {
    console.error(`Error connecting to MySQL server: ${error}`);
  }
})();

module.exports = connectionPromise;
