const mysql = require('mysql');
require('dotenv').config();

const Password = process.env.PASSWORD;
const userName = process.env.USER_NAME;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

var con = mysql.createConnection({
  host: dbHost,
  user: userName,
  password: Password,
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  con.end();
});

con.query('CREATE DATABASE IF NOT EXISTS ' + dbName, (err) => {
  if (err) throw err;
  console.log('Database created');
});

con.changeUser({ database: dbName }, (err) => {
  if (err) throw err;
});

let sql_users_table =
  'CREATE TABLE IF NOT EXISTS ' +
  dbName +
  '.users_details' +
  '(`email` VARCHAR(50) NOT NULL, `first_name` VARCHAR(45) NOT NULL, `last_name` VARCHAR(45) NOT NULL, `phone_number` VARCHAR(10) NOT NULL, `password` VARCHAR(128) NOT NULL, `password_token` VARCHAR(255) NOT NULL, `pass_token_activated` TINYINT NOT NULL , `creation_token` VARCHAR(45) NOT NULL, `logins` INT NOT NULL, `login_time`DATETIME NOT NULL, `activated` TINYINT NOT NULL, PRIMARY KEY(`email`))';

con.query(sql_users_table, function (err, result) {
  if (err) throw err;
  console.log('Users table created');
});

let sql_history_table =
  'CREATE TABLE IF NOT EXISTS ' +
  dbName +
  '.password_history' +
  '(`email` VARCHAR(50) NOT NULL, `password` VARCHAR(128) NOT NULL,`creation_date` DATETIME NOT NULL, PRIMARY KEY(`email`, `password`))';

con.query(sql_history_table, function (err, result) {
  if (err) throw err;
  console.log('Password history table created');
});

let sql_clients_table =
  'CREATE TABLE IF NOT EXISTS ' +
  dbName +
  '.clients' +
  '(`email` VARCHAR(50) NOT NULL, `first_name` VARCHAR(45) NOT NULL, `last_name` VARCHAR(45) NOT NULL, `phone_number` VARCHAR(10) NOT NULL, `city` VARCHAR(45) NOT NULL, PRIMARY KEY(`email`))';

con.query(sql_clients_table, function (err, result) {
  if (err) throw err;
  console.log('Clients table created');
});
