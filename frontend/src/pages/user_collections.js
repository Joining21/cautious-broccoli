import { Button, Typography, Box, Grid } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayListIcon from '@mui/icons-material/PlaylistAdd';
import ArchiveIcon from "@mui/icons-material/Archive";
import { useState } from "react";
import { json, useParams } from "react-router-dom";
import { useEffect } from "react";
import * as React from "react";
import "../style.css";
import CreateEditUserDialog from "../components/create_edit_user_dialog";
import CreateEditSerieDialog from "../components/create_edit_serie_dialog";
import CreateEditMovieDialog from "../components/create_edit_movie_dialog";
import User from "../components/user_card";
import Serie from "../components/serie_card";
import Movie from "../components/movie_card";
import MediaUser from "../components/media_card_user";
import MediaDialog from "../components/media_dialog";
import axios from "axios";

export default function UserCollections() {
  const { user } = useParams();
  const[userDoc, setUserDoc]= useState(null);
  const[moviesList, setMoviesList]= useState([])
  const[seriesList, setSeriesList]=useState([])
  const[listS,setListS]=useState([])
  const[listM,setListM]=useState([])
  const [tab, setTab] = useState(0);
  const [abrirDialogoMedia, setAbrirDialogoMedia] = useState(false);
  const[mediaActual, setMediaActual]= useState({})
  const[puntuacion,setPuntuacion]=useState(0)

  //Variables user

  

  function addFavourite(idMedia) {

    const newMedia= {favourite: true}
    const objetoExistente = userDoc.seriesList.some(objeto => objeto.serie._id === idMedia);

    if(objetoExistente){
      const newFavourite= updateListSeries(userDoc,idMedia,newMedia);
      userDoc.seriesList= newFavourite
      
    }else{
      const newFavourite= updateListMovies(userDoc,idMedia,newMedia);
      userDoc.moviesList= newFavourite

    }
    
    axios
    .put(`/api/user/administrator/${userDoc._id}`,userDoc)
    .then(function (response) {
      console.log("Actualizado")
      
    })
    .catch(function (error) {
      alert(error.data);
    });
    
  }

  function deleteFavourite(idMedia) {

    const newMedia= {favourite: false}
    const objetoExistente = userDoc.seriesList.some(objeto => objeto.serie._id === idMedia);
    if(objetoExistente){
      const newFavourite= updateListSeries(userDoc,idMedia,newMedia);
      userDoc.seriesList= newFavourite
      
    }else{
      const newFavourite= updateListMovies(userDoc,idMedia,newMedia);
      userDoc.moviesList= newFavourite

    }
    
    axios
    .put(`/api/user/administrator/${userDoc._id}`,userDoc)
    .then(function (response) {
      console.log("Actualizado")
     
    })
    .catch(function (error) {
      alert(error.data);
    });

   
   
  }


  function closeDialogMedia() {
    
    const newMedia= {score: puntuacion}
    const objetoExistente = userDoc.seriesList.some(objeto => objeto.serie._id ==mediaActual._id);

    if(objetoExistente){
      const newFavourite= updateListSeries(userDoc,mediaActual._id,newMedia);
    
      userDoc.seriesList= newFavourite
      
    }else{
      const newFavourite= updateListMovies(userDoc,mediaActual._id,newMedia);
      userDoc.moviesList= newFavourite

    }

    axios
    .put(`/api/user/administrator/${userDoc._id}`,userDoc)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      alert(error.data);
    });

    setAbrirDialogoMedia(false);
  }

  function openDialogMedia(media) {
    setMediaActual(media);
    setAbrirDialogoMedia(true);
  }


  function deleteToWatch(idMedia) {

    const objetoExistente = userDoc.seriesList.some(objeto => objeto.serie._id === idMedia);

    if(objetoExistente){
      const deleteMedia = userDoc.seriesList.filter(objeto => objeto.serie._id !== idMedia);
      userDoc.seriesList= deleteMedia
      
    }else{
      const deleteMedia = userDoc.moviesList.filter(objeto => objeto.movie._id !== idMedia);
      userDoc.moviesList= deleteMedia

    }
    
    axios
    .put(`/api/user/administrator/${userDoc._id}`,userDoc)
    .then(function (response) {
      console.log("Actualizado")
      
  
    })
    .catch(function (error) {
      alert(error.data);
    });

    
  }

  function addToSeen(idMedia){

    
    const newMedia= {seen: true, toWatch: false}
    const objetoExistente = userDoc.seriesList.some(objeto => objeto.serie._id == idMedia);
    console.log(idMedia)
    if(objetoExistente){
      console.log("Lista",newMedia)
      const newFavourite= updateListSeries(userDoc,idMedia,newMedia);
      console.log(newFavourite.serie)
      userDoc.seriesList= newFavourite
      
    }else{
      const newFavourite= updateListMovies(userDoc,idMedia,newMedia);
      userDoc.moviesList= newFavourite

    }
    
    axios
    .put(`/api/user/administrator/${userDoc._id}`,userDoc)
    .then(function (response) {
      console.log("Actualizado")
     
    
   
    })
    .catch(function (error) {
      alert(error.data);
    });

   
    
  }

  function deleteToSeen(idMedia){

    const newMedia= {seen:false,toWatch:true,favourite: false, score:0}
    const objetoExistente = userDoc.seriesList.some(objeto => objeto.serie._id === idMedia);

    if(objetoExistente){
      
      const newFavourite= updateListSeries(userDoc,idMedia,newMedia);
      userDoc.seriesList= newFavourite
      
    }else{
      const newFavourite= updateListMovies(userDoc,idMedia,newMedia);
      userDoc.moviesList= newFavourite

    }
    
    axios
    .put(`/api/user/administrator/${userDoc._id}`,userDoc)
    .then(function (response) {
      console.log("Actualizado")
      
    
    })
    .catch(function (error) {
      alert(error.data);
    });

    
  }

  function updateListMovies(user, idMedia, cambios) {
    
    const nuevaLista = user.moviesList.map(objeto => {
      if (objeto.movie._id === idMedia) {
        return { ...objeto, ...cambios };
      }
      return objeto;
    });
  
    return nuevaLista;
  }

  function updateListSeries(user, idMedia, cambios) {
    
    const nuevaLista = user.seriesList.map(objeto => {
      if (objeto.serie._id === idMedia) {
        return { ...objeto, ...cambios };
      }
      return objeto;
    });
    console.log("Lista",nuevaLista)
    return nuevaLista;
  }

  let componenteRender;

  if (tab == 0) {

   
    componenteRender = (
      <Box m={2} ml={5} mb={5}>
        <Grid container spacing={4}>
          {listS.map((media, index) => (
            <Grid item xs={4} key={index}>
              <MediaUser
                media={media.serie}
                anadirVisto={addToSeen}
                eliminarPendientes={deleteToWatch}
                abrirDescripcion={openDialogMedia}
                tipo={1}
              />
            </Grid>
          ))}

          {listM.map((media, index) => (
            <Grid item xs={4} key={index}>
              <MediaUser
                media={media.movie}
                anadirVisto={addToSeen}
                eliminarPendientes={deleteToWatch}
                abrirDescripcion={openDialogMedia}
                tipo={1}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else if (tab == 1) {

    componenteRender = (
      <Box m={2} ml={5} mb={5}>
        <Grid container spacing={4}>
          {listS.map((media, index) => (
            <Grid item xs={4} key={index}>
              <MediaUser
                media={media.serie}
                anadirFavorito={addFavourite}
                eliminarVisto={deleteToSeen}
                abrirDescripcion={openDialogMedia}
                tipo={2}
              />
            </Grid>
          ))}

          {listM.map((media, index) => (
            <Grid item xs={4} key={index}>
              <MediaUser
                media={media.movie}
                anadirFavorito={addFavourite}
                eliminarVisto={deleteToSeen}
                abrirDescripcion={openDialogMedia}
                tipo={2}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }else if(tab==2){
    

    componenteRender = (
      <Box m={2} ml={5} mb={5}>
        <Grid container spacing={4}>
          {listS.map((media, index) => (
            <Grid item xs={4} key={index}>
              <MediaUser
                media={media.serie}
                eliminarFavorito={deleteFavourite}
                abrirDescripcion={openDialogMedia}
                tipo={3}
              />
            </Grid>
          ))}

          {listM.map((media, index) => (
            <Grid item xs={4} key={index}>
              <MediaUser
               media={media.movie}
               eliminarFavorito={deleteFavourite}
               abrirDescripcion={openDialogMedia}
               tipo={3}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );

  }

  function actualizarUser(){

    axios
    .get(`/api/${user}/collections`)
    .then(function (response) {
      
      const user= response.data
      setUserDoc(user)
      setSeriesList(user.seriesList)
      setMoviesList(user.moviesList)
    })
    .catch(function (error) {
      alert(error.data);
    });
    
  }

  function actualizarTabs(){
    if (tab === 0) {
      const filteredListS = seriesList.filter(objeto => objeto.toWatch);
      const filteredListM = moviesList.filter(objeto => objeto.toWatch);
      setListS(filteredListS);
      setListM(filteredListM);
    } else if (tab === 1) {
      const filteredListS = seriesList.filter(objeto => objeto.seen);
      const filteredListM = moviesList.filter(objeto => objeto.seen);
      setListS(filteredListS);
      setListM(filteredListM);
    } else if (tab === 2) {
      const filteredListS = seriesList.filter(objeto => objeto.favourite);
      const filteredListM = moviesList.filter(objeto => objeto.favourite);
      setListS(filteredListS);
      setListM(filteredListM);
    }
  }

 
  useEffect(() => {
    actualizarUser()
    actualizarTabs()
   
  },[seriesList,moviesList, userDoc]);

  return (
    <div>
      <Box id="encabezado" height>
        <Typography id="title" variant="h1" component="h2" gutterBottom>
          Mis Listas
        </Typography>
      </Box>

      <Paper sx={{ width: "100%", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={tab}
          onChange={(event, newValue) => {
            console.log(newValue);
            setTab(newValue);
          }}
        >
        <BottomNavigationAction 
          label="Pendientes" 
          icon={ <PlayListIcon />}
        />
        <BottomNavigationAction
            label="Vistos"
            icon={<VisibilityIcon />}
          />
          <BottomNavigationAction
            label="Favoritos"
            icon={<FavoriteIcon />}
          />
        </BottomNavigation>
      </Paper>

      <MediaDialog

          abrirDialogo={abrirDialogoMedia}
          cerrarDialogo={closeDialogMedia}
          puntuacionMedia={puntuacion}
          setPuntuacionMedia={setPuntuacion}
          media={mediaActual}
          tipo={tab}
      />
      

      {componenteRender}
    </div>
  );
}
