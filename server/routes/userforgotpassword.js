const express = require('express');
const router = express.Router();
const allQueries = require('../models/queries');
const sha1 = require('sha1');

router.post('/reset', async function (req, res) {
  const { email } = req.body;
  const userExists = await allQueries.checkUserMail(email, con);

  if (userExists) {
    const code = Math.floor(Math.random() * 1000000);
    const hashedValue = sha1(code);

    sendEmail(
      email,
      'Password Reset',
      `Your password reset code is: ${hashedValue}`
    );

    return res
      .status(200)
      .send('A verification code has been sent to your email address');
  } else return res.status(400).send('User does not exist!');
});

module.exports = router;
