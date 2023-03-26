const mysql = require("mysql2/promise");
require("dotenv").config();
const express = require("express");

const app = express();

// Create a connection to the MySQL server
const connectionPromise = mysql.createConnection({
  host: "localhost",
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
});

// Get the connection object from the promise
connectionPromise.then((connection) => {
  console.log("Connected");

  // Create a new schema
  connection.query("CREATE SCHEMA comunication_ltd");

  // Switch to the new schema
  connection.query("USE comunication_ltd");

  // Create a new table
  async function createTables() {
    try {
      await connection.execute(`
        CREATE TABLE clients (
          user_id INT PRIMARY KEY NOT NULL,
          name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          mail VARCHAR(50) NOT NULL UNIQUE
        );

        CREATE TABLE employees_details (
          name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          mail VARCHAR(50) NOT NULL UNIQUE
        );

        CREATE TABLE password_history (
          user_id INT PRIMARY KEY NOT NULL,
          password VARCHAR(10) NOT NULL
        );
      `);
      console.log("Tables created successfully");
    } catch (error) {
      console.error("Error creating tables:", error);
    }
    console.log(process.env.PASSWORD);
  }

  createTables();
});

console.log(process.env.PASSWORD);
