const express = require('express');
const router = express.Router();
const allQueries = require('../models/queries');
const con = require('../models/connection_create');
const validator = require('../security/securityFunctions');

router.delete('/', async function (req, res) {
  const { city, email, first_name, last_name, phone_number } = req.body;

  const newEmail = validator.isValidEmail(email);
  const newPhoneNumber = validator.checkPhone(phone_number);

  //If the client wants to delete himself
  try {
    const deletedClient = await allQueries.removeClient(
      first_name,
      last_name,
      newEmail,
      newPhoneNumber,
      city,
      con
    );
    if (deletedClient)
      return res.status(200).send('Client removed successfully!');
    return res.status(404).send('The client is not found!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error removing client!');
  }
});

module.exports = router;
