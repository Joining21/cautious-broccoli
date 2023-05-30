const express = require("express");
const router = express.Router();

const User = require("../modelos/user");

router.get("/user/administrator", async function (req, res) {
  const users = (await User.find({admin: false}));
  if (users) {
    res.send(users);
  } else {
    res.send("No hay usuarios");
  }
});

router.get("/:user/collections", async function (req, res) {
  const username= req.params.user;
  const users = await User.findOne({user: username}).populate('seriesList.serie').populate('moviesList.movie').exec();

  if (users) {
    res.send(users);
  } else {
    res.send("No hay usuarios");
  }
});

router.put("/user/administrator/:id_usuario", async function (req, res) {
  let idUser = req.params.id_usuario;

  const updatedUser = req.body;

  const newUpdatedUser = await User.findByIdAndUpdate(
    { _id: idUser },
    updatedUser
  );
  await newUpdatedUser.save();
  res.send(newUpdatedUser);
});


router.delete("/user/administrator/:id_usuario", async function (req, res) {
  const idUser = req.params.id_usuario;
  const userExist = await User.findOne({ _id: idUser });

  if (!userExist) {
    return res.status(400).send("Usuario no encontrado");
  } else {
    await User.deleteOne({ _id: idUser });
    return res.status(200).send("Usuario eliminado");
  }
});
module.exports = router;
