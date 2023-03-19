const mysql = require("mysql2/promise");

// Create a connection to the MySQL server
const connection = await mysql.createConnection({
  host: "localhost",
  user: "your_user",
  password: "your_password",
});

// Create a new schema
await connection.execute("CREATE SCHEMA comunication_ltd");

// Switch to the new schema
await connection.execute("USE comunication_ltd");

// Create a new table
await connection.execute(`
  CREATE TABLE users (
    user_id INT PRIMARY KEY NOT NULL,
    name CHARVAR(50) NOT NULL,
    last_name CHARVAR(50) NOT NULL,
    mail CHARVAR(50) NOT NULL UNIQUE,
  )


  CREATE TABLE surfing_packages (
    price INT NOT NULL,
    name CHARVAR(50) NOT NULL,
    last_name CHARVAR(50) NOT NULL,
    mail CHARVAR(50) NOT NULL UNIQUE,
  )

`);
