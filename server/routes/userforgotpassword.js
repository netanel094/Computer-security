const express = require('express');
require('dotenv').config();
const router = express.Router();
const allQueries = require('../models/queries');
const sha1 = require('sha1');
const con = require('../models/connection_create');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendConfirmationEmail = (email, hashedValue) => {
  transporter
    .sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
              <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
              <a href=https://localhost:3000/changepassword/${hashedValue}> Click here</a>
              </div>`,
    })
    .catch((err) => console.log(err));
};

router.post('/', async function (req, res) {
  const code = Math.floor(Math.random() * 1000000);
  const hashedValue = sha1(code);
  const { email } = req.body;
  const userExists = await allQueries.checkUserMail(email, con);

  if (userExists) {
    sendConfirmationEmail(email, hashedValue);
    return res.status(200).send('Sent the code check the email please');
  } else res.status(404).send('Error user does not exist!');
});

module.exports = router;
