const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/assets/*", (req, res) => {
  res.sendFile(path.resolve(`./dist${req.path}`));
});

router.get("/*", (req, res) => {
  res.sendFile(path.resolve(`./dist/index.html`));
});

module.exports = router;
