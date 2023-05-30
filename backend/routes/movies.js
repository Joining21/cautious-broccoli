const express = require("express");
const router = express.Router();

const Movie = require("../modelos/movie");

router.get("/:user/collections/movies", async function (req, res){

    const ids= req.body;

    const movies= await Movie.find({ _id: { $in: ids } })

    if(movies!=null){
        res.send(movies);
    }else{
       res.sendStatus(400)
    }

});

router.post("/user/administrator/movies", async function (req, res) {

    const newMovie= req.body;
 
    const insert = await Movie.create(newMovie);
        //No añadia 
        /*if(insert.acknowledged) {
            return res.status(200).send("Pelicula añadida");
        } else {
            return res.status(400).send("Error al insertar pelicula");
        }*/

        if (!Movie) {
            return res.sendStatus(500);
          }
          res.sendStatus(200);


});


router.put("/user/administrator/movies/:id_pelicula", async function (req, res) {

    const id = req.params.id_pelicula;
    const newMovie= req.body

    try {
        const update =await Movie.findByIdAndUpdate(id,newMovie);
        res.send(newMovie)
    } catch (error) {
        res.sendStatus(400)
    }
  

    
      /* if(update.nModified > 0) {
            return res.status(200).send("Pelicula modificada correctamente");
       } else {
            return res.status(400).send("No se ha realizado ninguna modificacion");
       }*/

});

router.get('/user/administrator/movies', async function(req,res){
    const movies = await Movie.find({});
    
    if (movies) {
        res.send(movies);
    }else{
        res.send("No hay películas.");
    }

});

router.delete("/:user/administrator/movies/:id_pelicula", async function (req, res) {
    const idMovie = req.params.id_pelicula;
    const movieExist = await Movie.findOne({ _id: idMovie });
  
    if (!movieExist) {
      return res.status(400).send("Película no encontrada");
    } else {
      await Movie.deleteOne({ _id: idMovie });
      return res.status(200).send("Película eliminada");
    }
  });
module.exports = router;