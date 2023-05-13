const express = require('express');
const router = express.Router();
const allQueries = require('../models/queries');
const con = require('../models/connection_create');
const security = require('../security/securityFunctions');

router.post('/', async function (req, res) {
  try {
    const { email, currentPassword, newPassword, confirmNewPassword } =
      req.body;
    const old_password = currentPassword;
    const new_password = newPassword;
    const verification_password = confirmNewPassword;
    console.log({ currentPassword });

    if (!security.checkPassword(new_password))
      return res.status(400).send('The new password is not valid');

    //Checking if the new password equals to the verification password
    if (new_password !== verification_password)
      return res
        .status(400)
        .send('The password and the verification password do not match');
    if (new_password === old_password)
      return res.status(400).send('Please enter a password you never used');

    const updatedPassword = await allQueries.updatePassword(
      email,
      old_password,
      new_password,
      con
    );

    if (!updatedPassword)
      return res.status(400).send('Error changing password!');

    return res.status(200).send('Password changed succesfully!');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error in back end');
  }
});

module.exports = router;
