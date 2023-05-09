const express = require('express');
const router = express.Router();
const allQueries = require('../models/queries');
const con = require('../models/connection_create');
const validator = require('../security/securityFunctions.js');

router.delete('/', async function (req, res) {
  const { email } = req.body;

  //If the client wants to delete himself
  try {
    const deletedClient = await allQueries.removeClient(email, con);
    if (!deletedClient) return res.status(404).send('The client is not found!');
    return res.status(200).send('Client removed successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error removing client!');
  }
});

module.exports = router;
