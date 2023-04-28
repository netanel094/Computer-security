const fs = require('fs');
const express = require('express');
const router = express.Router();
const con = require('../models/connection_create');
const allQueries = require('../models/queries');

const config = JSON.parse(fs.readFileSync('config.json'));

router.post('/', async function (req, res) {
  const { password, email } = req.body;

  try {
    const userAuthentication = await allQueries.checkUserExists(
      email,
      password,
      con
    );
    if (!userAuthentication) return res.status(404).send('User is not found!');

    const realPassword = await allQueries.findUserPassword(email, con);

    if (password !== realPassword)
      return res.status(400).send('Password or email are wrong! Try again!');
    else res.redirect('/showclients');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error User Authentication!');
  }
});

module.exports = router;
