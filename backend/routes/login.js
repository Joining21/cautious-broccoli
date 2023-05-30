const express = require("express");
const router = express.Router();
const Users= require("../modelos/user")
router.post("/", async function (req, res) {

    const usuario= req.body.user
    const contrasenia= req.body.password
  
    const logedUser= await Users.findOne({user: usuario})
    if (logedUser!=null) {
      if (logedUser.password == contrasenia) {
        res.send(logedUser);
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
 
});
module.exports = router;