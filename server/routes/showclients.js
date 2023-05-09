const express = require('express');
const router = express.Router();
const con = require('../models/connection_create');
const allQueries = require('../models/queries');

router.post('/', async function (req, res) {
  const { sortBy, sortOrder } = req.body;
  console.log(req.body);
  //This route is to return all the clients that exist in the database
  const allClients = await allQueries.getAllClients(sortBy, sortOrder, con);

  if (allClients) return res.status(200).send(allClients);
  else return res.status(404).send('Clients not found!');
});

module.exports = router;
