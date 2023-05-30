const express = require("express");
const router = express.Router();


const Serie= require("../modelos/serie")
const User= require("../modelos/user")


router.get("/:user/collections/series", async function (req, res){

    const ids= req.body;

    const series= await Serie.find({ _id: { $in: ids } })

    if(series!=null){
        res.send(series);
    }else{
       res.sendStatus(400)
    }

});
router.post("/user/administrator/series", async function (req, res) {
    //No funciona, pillas los datos de parametros, el json esta en el cuerpo
    /*const title = req.params.title;
    const sinopsis = req.params.sinopsis;
    const genre = req.params.genre;
    const language = req.params.language;
    const seasons = req.params.seasons;*/

    const serie= req.body;
    //const insert = new Serie({ title: title, sinopsis: sinopsis, genre: genre, language: language, seasons: seasons });
    const insert= new Serie(serie);

    //No añade
   /*insert.save(function (err) {
        if (err) {
            res.status(400).send("Error al insertar la serie");
        } else {
            res.status(200).send("Serie añadida");
        }
    });*/

    try {

        insert.save()
        res.send(200)
        
    } catch (error) {
        
        res.sendStatus(400)
    }
   
   
});


router.get("/user/administrator/series", async function (req, res){

    const series = await Serie.find({})

    if(series!=null){

        res.send(series)

    }else{
        res.sendStatus(400)
    }



});

router.delete("/user/administrator/series/:id_serie", async function (req, res){

    const id_serie= req.params.id_serie
    //Primero hay que borrar todas las referencias a la serie

    await User.updateMany({seenSeriesList: id_serie}, {$pull: {seenSeriesList: id_serie}})
    await User.updateMany({toWatchSeries: id_serie}, {$pull: {toWatchSeries: id_serie}})
    await User.updateMany({favouriteSeriesList: id_serie}, {$pull: {favouriteSeriesList: id_serie}})

    //Ahora borramos la serie de la base
    try {

        await Serie.deleteOne({_id: id_serie})
    
        //Y ya..?
        res.send(200)
        
    } catch (error) {
        res.sendStatus(400)
    }
  

});

router.put("/user/administrator/series/:id_serie", async function (req, res){

    const id_serie= req.params.id_serie

    const serie= await Serie.findOne({_id: id_serie})

    if(serie!=null){

        const obj= req.body

        for(const x in obj){
            serie[x]= obj[x]
        }

        serie.save()

        res.send(obj)
    }else{
        res.sendStatus(400)
    }

});


module.exports = router;