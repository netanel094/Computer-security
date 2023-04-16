var express = require('express');
var router = express.Router();
const con = require('../models/connection_create');
const allQueries = require('../models/queries');

/* GET home page. */
router.post('/', async function (req, res, next) {
  const { password, email } = req.body;

  try {
    const userAuthentication = await allQueries.checkUserExists(
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
  }
});

module.exports = router;
