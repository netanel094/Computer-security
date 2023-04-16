const express = require('express');
const router = express.Router();
const con = require('../models/connection_create');
const allQueries = require('../models/queries');

router.post('/', async function (req, res) {
  const { password, email } = req.body;

  try {
    const userAuthentication = await allQueries.checkUserExists(
      email,
      password,
      con
    );
    if (userAuthentication === false)
      return res.status(400).send('User is not found!');
    else res.redirect('/showclients');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error User Authentication!');
  }
});

module.exports = router;
