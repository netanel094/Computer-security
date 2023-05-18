// const mysql = require("mysql2");
// require("dotenv").config();
// const con = require("../models/connection_create");

// const dbName = "communication_ltd";

// con.connect((err) => {
//   if (err) throw err;
//   console.log("Connected!");
//   con.end();
// });

// con.query("CREATE DATABASE IF NOT EXISTS " + dbName, (err) => {
//   if (err) throw err;
//   console.log("Database created");
// });

// // con.changeUser() is used to switch the connection to the dbName database.
// con.changeUser({ database: dbName }, (err) => {
//   if (err) throw err;
// });

// let sql_users_table = `CREATE TABLE IF NOT EXISTS ${dbName}.users_details (
//   email VARCHAR(50) NOT NULL,
//   first_name VARCHAR(45) NOT NULL,
//   last_name VARCHAR(45) NOT NULL,
//   phone_number VARCHAR(10) NOT NULL,
//   password VARCHAR(128) NOT NULL,
//   logins int NOT NULL DEFAULT 0,
//   city VARCHAR(50) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   PRIMARY KEY (email)
// )`;

// con.query(sql_users_table, function (err) {
//   if (err) throw err;
//   console.log("Users table created");
// });

// let sql_history_table =
//   "CREATE TABLE IF NOT EXISTS " +
//   dbName +
//   ".password_history" +
//   "(`email` VARCHAR(50) NOT NULL, `password` VARCHAR(128) NOT NULL,`creation_date` DATETIME NOT NULL, PRIMARY KEY(`email`, `password`))";

// con.query(sql_history_table, function (err, result) {
//   if (err) throw err;
//   console.log("Password history table created");
// });

// let sql_clients_table =
//   "CREATE TABLE IF NOT EXISTS " +
//   dbName +
//   ".clients" +
//   "(`email` VARCHAR(50) NOT NULL, `first_name` VARCHAR(45) NOT NULL, `last_name` VARCHAR(45) NOT NULL, `phone_number` VARCHAR(10) NOT NULL, `city` VARCHAR(45) NOT NULL, PRIMARY KEY(`email`))";

// con.query(sql_clients_table, function (err) {
//   if (err) throw err;
//   console.log("Clients table created");
// });
