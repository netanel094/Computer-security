const express = require('express');
const router = express.Router();
const allQueries = require('../models/queries');
const con = require('../models/connection_create');
const security = require('../security/securityFunctions');

router.post('/', async function (req, res) {
  try {
    const { search_string, sortBy, sortOrder } = req.body;

    if (!security.inputValidate(search_string))
      return res.status(400).send('The search string is not valid');

    //Searching the client by one one the substrings (email, phone number, first name, last name, city)
    const result = await allQueries.searchClient(
      search_string,
      sortBy,
      sortOrder,
      con
    );

    if (result === false)
      return res.status(404).send('Did not find clients with this sub string');

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error searching table');
  }
});

module.exports = router;
