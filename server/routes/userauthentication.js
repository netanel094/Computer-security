<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const con = require('../models/connection_create');
const allQueries = require('../models/queries');

router.post('/', async function (req, res) {
=======
var express = require('express');
var router = express.Router();
const con = require('../models/connection_create');
const allQueries = require('../models/queries');

/* GET home page. */
router.post('/', async function (req, res, next) {
>>>>>>> a489f13 (create userAuthentication route)
  const { password, email } = req.body;

  try {
    const userAuthentication = await allQueries.checkUserExists(
<<<<<<< HEAD
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
=======
      password,
      email,
      con
    );
    if (!userAuthentication) return res.status(400).send('User is not found!');

    const allClients = await allQueries.getAllClients(con);
    if (!allClients) {
      return res.status(400).send('No clients found!');
    } else {
      return res.status(200).send(allClients);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error User Authentication !');
>>>>>>> a489f13 (create userAuthentication route)
  }
});

module.exports = router;
