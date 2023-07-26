const express = require("express");
const router = express.Router();
const allQueries = require("../models/queries");
const con = require("../models/connection_create");
const security = require("../security/securityFunctions");

router.post("/", async function (req, res) {
  try {
    const { password, email, first_name, last_name, phone_number, city } =
      req.body;

    const userExists = await allQueries.checkUserExists(email, con);
    console.log(userExists);
    if (userExists) return res.status(400).send("User already exists!");

    if (!security.isValidEmail(email))
      return res.status(400).send("The email is not valid!");
    const passwordResult = security.checkPassword(password);

    if (passwordResult !== "all required elements")
      return res
        .status(400)
        .send(`The password is not valid! --> ${passwordResult}`);

    if (!security.checkPhone(phone_number))
      return res.status(400).send("The phone number is not valid!");

    const hashedPassword = await security.hashPassword(password);

    //Adding a user to the database
    const userInserted = await allQueries.insertUser(
      email,
      first_name,
      last_name,
      phone_number,
      hashedPassword,
      city,
      con
    );
    if (userInserted === false)
      return res
        .status(500)
        .send("Some error occured while inserting the user");

    return res.status(200).send("Signed up successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error adding user");
  }
});

module.exports = router;
