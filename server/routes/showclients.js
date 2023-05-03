const express = require('express');
const router = express.Router();
const con = require('../models/connection_create');
const allQueries = require('../models/queries');

router.get('/', async function (req, res) {
  //This route is to return all the clients that exist in the database
  const allClients = await allQueries.getAllClients(con);

  if (allClients) return res.status(200).send(allClients);
  else return res.status(404).send('Clients not found!');
});

module.exports = router;
