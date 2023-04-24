const express = require('express');
const router = express.Router();
const allQueries = require('../models/queries');
const con = require('../models/connection_create');

router.post('/', async function (req, res) {
  const { email, old_password, new_password, verification_password } = req.body;

  if (new_password !== verification_password)
    return res.status(400).send('The passwords do not match!');
    
  else if (new_password === old_password) {
    return res
      .status(400)
      .send('The password you entered is your old password!');
  }
  const updatedPassword = allQueries.updatePassword(
    email,
    old_password,
    new_password,
    con
  );

  if (!updatedPassword)
    return res.status(400).send('Error changing passwords!');

  return res.status(200).send('Passwords changed succesfully!');
});

module.exports = router;
