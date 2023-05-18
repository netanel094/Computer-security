const express = require("express");
const router = express.Router();
const allQueries = require("../models/queries");
const con = require("../models/connection_create");
const security = require("../security/securityFunctions");
const config = require("../config.json");

router.post("/", async function (req, res) {
  try {
    const { email, currentPassword, newPassword, confirmNewPassword } =
      req.body;

    const hashedCurrentPassword = await security.hashPassword(currentPassword);
    const newHashedPassword = await security.hashPassword(newPassword);

    if (security.checkPassword(newPassword) !== "all required elements")
      return res
        .status(400)
        .send(
          `The password must be in length of min ${config.password.length} and must contain at least one number [0-9], one uppercase letter [A - Z] one lowercase letter [a - z] and one special charecter`
        );

    const realPassword = await allQueries.findUserPassword(email, con);

    if (realPassword !== hashedCurrentPassword)
      return res.status(400).send("You entered incorrect old password !");

    //Checking if the new password equals to the verification password
    if (newPassword !== confirmNewPassword)
      return res
        .status(400)
        .send("The password and the verification password do not match");
    if (newPassword === currentPassword)
      return res.status(400).send("Please enter a password you never used");

    const { success, message } = await allQueries.updatePassword(
      email,
      newHashedPassword,
      con
    );

    if (!success) return res.status(400).send(message);

    return res.status(200).send("Password changed succesfully !");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error !");
  }
});

module.exports = router;
