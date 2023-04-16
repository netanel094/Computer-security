const express = require('express');
const router = express.Router();
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
    if (userInserted === false)
      return res.status(400).send('Could not push user!');

    return res.status(200).send('User inserted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding user!');
  }
});

module.exports = router;
