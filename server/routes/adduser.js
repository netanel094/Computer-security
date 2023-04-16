var express = require('express');
var router = express.Router();
const allQueries = require('../models/queries');
const con = require('../models/connection_create');

router.post('/', async function (req, res) {
  const { password, email, first_name, last_name, phone_number } = req.body;

  try {
    const userInserted = await allQueries.insertUser(
      email,
      first_name,
      last_name,
      phone_number,
      password,
      con
    );
    if (userInserted) {
      res.status(200).send('User inserted successfully!');
    } else {
      res.status(400).send('User already exists!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding user!');
  }
});

module.exports = router;
