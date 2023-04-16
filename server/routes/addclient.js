const express = require('express');
const router = express.Router();
const allQueries = require('../models/queries');
const con = require('../models/connection_create');

router.post('/', async function (req, res) {
  const { city, email, first_name, last_name, phone_number } = req.body;

  try {
    const clientInserted = await allQueries.insertClient(
      email,
      first_name,
      last_name,
      phone_number,
      city,
      con
    );
    if (!clientInserted) return res.status(400).send('Client already exists!');
    return res.status(200).send('Client inserted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding client!');
  }
});

module.exports = router;
