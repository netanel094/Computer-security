const express = require('express');
require('dotenv').config();
const router = express.Router();
const sha1 = require('sha1');
const con = require('../models/connection_create');
const nodemailer = require('nodemailer');
const allQueries = require('../models/queries');
const security = require('../security/securityFunctions');

//We created an email in order to send a confirmation email to the user
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendConfirmationEmail = async (email, hashedValue) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'This is your new password',
      html: `<h1>Confirmation Code</h1>
                <p>Please use this as your new password until you change it</p>
                <p>${hashedValue}</p>
                </div>`,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

router.post('/', async function (req, res) {
  try {
    const code = Math.floor(Math.random() * 1000000);
    const hashedValue = sha1(code);
    const { email } = req.body;
    if (!security.isValidEmail(email))
      return res.status(400).send('The email is not valid!');

    const userExists = await allQueries.checkUserExists(email, con);

    if (!userExists) return res.status(404).send('Error user does not exist!');

    await allQueries.userForgotPassword(email, hashedValue, con);
    const isSent = await sendConfirmationEmail(email, hashedValue);
    if (!isSent) return res.status(500).send('Error sending email');
    return res.status(200).send('Sent a new password please check the email!');
  } catch (error) {
    return res.status(500).send('Error in back');
  }
});

module.exports = router;
