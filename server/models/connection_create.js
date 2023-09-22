const mysql = require("mysql2");
require("dotenv").config();

// Create a connection to the MySQL server
const connectionPromise = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connectionPromise.on("error", (err) => {
  console.error(`Error connecting to MySQL server: ${err}`);
});

const checkConnection = async (con) => {
  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) resolve(false);
      else resolve(true);
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
