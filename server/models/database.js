const mysql = require('mysql2/promise');
require('dotenv').config();

const Password = process.env.PASSWORD;
const userName = process.env.USER_NAME;

// Create a connection to the MySQL server
const connectionPromise = mysql.createConnection({
  user: userName,
  password: Password,
});

// Get the connection object from the promise
connectionPromise.then(async (connection) => {
  console.log('Connected');

  const [rows] = await connection.query(
    "SHOW DATABASES LIKE 'comunication_ltd'"
  );
  if (rows.length === 1) {
    console.log('comunication_ltd schema exists');
  } else {
    console.log('comunication_ltd schema does not exist');
    await connection.query('CREATE SCHEMA comunication_ltd');
  }

  await connection.query('USE comunication_ltd');

  try {
    const [rows1] = await connection.execute("SHOW TABLES LIKE 'clients'");
    console.log(rows1);
    if (rows1.length > 0) {
      console.log("Table 'clients' already exists");
    } else {
      await connection.execute(`
      CREATE TABLE clients (
      user_id INT PRIMARY KEY NOT NULL,
      name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      mail VARCHAR(50) NOT NULL UNIQUE
    )
  `);
    }

    const [rows2] = await connection.execute(
      "SHOW TABLES LIKE 'employees_details'"
    );
    if (rows2.length > 0) {
      console.log("Table 'employees_details' already exists");
    } else {
      await connection.execute(`
      CREATE TABLE employees_details (
        name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        mail VARCHAR(50) NOT NULL UNIQUE
      )
      
    `);
    }

    const [rows3] = await connection.execute(
      "SHOW TABLES LIKE 'password_history'"
    );
    if (rows3.length > 0) {
      console.log("Table 'password_history' already exists");
    } else {
      await connection.execute(`
      CREATE TABLE password_history (
        user_id INT PRIMARY KEY NOT NULL,
        password VARCHAR(10) NOT NULL
      )
      
    `);
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  }
});
