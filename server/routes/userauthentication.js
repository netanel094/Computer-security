const fs = require('fs');
const express = require('express');
const router = express.Router();
const con = require('../models/connection_create');
const allQueries = require('../models/queries');
const config = require('../config.json');
const security = require('../security/securityFunctions');

router.post('/', async function (req, res) {
  try {
    const { password, email } = req.body;

    //Getting the current time and the last time he tried to log in and checking if his block duration has ended
    const currentTime = new Date();
    const lastTimeLogin = await allQueries.lastTimeLogin(email, con);
    const timeDiff = (currentTime.getTime() - lastTimeLogin.getTime()) / 60000;
    const isBlocked = await allQueries.countLogins(email, con);
    const hashedPassword = await security.hashPassword(password);

    //If he is blocked
    if (isBlocked && timeDiff < config.block_duration) {
      return res
        .status(400)
        .send('You have attempted too many times. Try again later!');
      //If the block duration has passed we reset the logins back to 0
    }
    if (isBlocked && timeDiff > config.block_duration)
      await allQueries.resetLogins(email, con);

    //Checking if the user entered his real passsword
    const { success } = await allQueries.findUser(email, hashedPassword, con);

    if (!success) {
      //If his password is not correct we increment the logins to logins + 1
      await allQueries.updateLogins(email, con);
      await allQueries.updateTimeStamp(email, con);
      return res.status(401).send('User name or password is incorrect');
    }

    await allQueries.resetLogins(email, con);
    return res.status(200).send('Login succeeded');
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
