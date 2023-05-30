const express = require("express");
const router = express.Router();

const User = require("../modelos/user");

router.post("/", async function (req, res) {
  let newUser = req.body;

  await User.create(newUser);

  if (!User) {
    return res.sendStatus(500);
  }
  res.sendStatus(200);
});
module.exports = router;
