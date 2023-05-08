const express = require('express');
const router = express.Router();
const allQueries = require('../models/queries');
const con = require('../models/connection_create');
const security = require('../security/securityFunctions');

router.post('/', async function (req, res) {
  const { password, email, first_name, last_name, phone_number, city } =
    req.body;

  const userExists = await allQueries.checkUserExists(email, con);
  console.log(userExists);
  if (userExists) return res.status(400).send('User already exists!');

  if (!security.isValidEmail(email))
    return res.status(400).send('The email is not valid!');

  if (security.checkPassword(password) !== 'all required elements')
    return res.status(400).send('The password is not valid!');

  if (!security.checkPhone(phone_number))
    return res.status(400).send('The phone number is not valid!');

  //Adding a user to the database
  try {
    const userInserted = await allQueries.insertUser(
      email,
      first_name,
      last_name,
      phone_number,
      password,
      city,
      con
    );
    if (userInserted === false)
      return res
        .status(500)
        .send('Some error occured while inserting the user');

    return res.status(200).send('User inserted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error!!!');
  }
});

module.exports = router;
