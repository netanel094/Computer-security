const express = require('express');
const router = express.Router();
const allQueries = require('../models/queries');
const sha1 = require('sha1');
const con = require('../models/connection_create');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
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
              <a href=https://localhost:8080/activation/${hashedValue}> Click here</a>
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
    return res.status(200).send('Bla');
  } else {
    res.status(400).send('Error does not exist!');
  }
});

module.exports = router;
