import { Button, Typography, Box, Grid } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useState } from "react";
import { useParams } from "react-router-dom";
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
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function UserMenu() {
  const navigate = useNavigate();
  const { user } = useParams();
  const[userDoc, setUserDoc]= useState(null);
  const [seriesList, setSeriesList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [tipo, setTipo]= useState(0);
  const [abrirDialogoMedia, setAbrirDialogoMedia] = useState(false);
  const[mediaActual, setMediaActual]= useState({})
  const [tab, setTab] = useState(0);

  //Variables user


  function closeDialogMedia() {
    setAbrirDialogoMedia(false);
  }

  function openDialogMedia(media, type) {
    setTipo(type)
    setMediaActual(media);

    setAbrirDialogoMedia(true);
  }

  const saveScore=(newValue)=> {

    setAbrirDialogoMedia(false);
  }

  function addToWatch(media){

    if(tab==0){
      const newMedia= {serie: media, seen: false, toWatch: true, favourite: false, score:0}
      const objetoExistente = userDoc.seriesList.some(objeto => objeto.serie._id === media._id);
      console.log(objetoExistente)
      if(!objetoExistente){
        userDoc.seriesList.push(newMedia)
      }
        
    }else{
      const newMedia= {movie: media, seen: false, toWatch: true, favourite: false}
      const objetoExistente = userDoc.moviesList.some(objeto => objeto.movie._id === media._id);
      if(!objetoExistente){
        userDoc.moviesList.push(newMedia)
      }
        
    }
    

    axios
    .put(`/api/user/administrator/${userDoc._id}`,userDoc)
    .then(function (response) {
      console.log("Actualizado")
      console.log(response.data.seriesList)
    })
    .catch(function (error) {
      alert(error.data);
    });
    
  }


  

  function actualizarUser(){

    axios
    .get(`/api/${user}/collections`)
    .then(function (response) {
      console.log(response.data)
      const user= response.data
      setUserDoc(user)
    })
    .catch(function (error) {
      alert(error.data);
    });
    
  }

  function updateSeriesList() {
    axios
      .get(`/api/user/administrator/series`)
      .then(function (response) {
        setSeriesList(response.data);
      })
      .catch(function (error) {
        alert(error.data);
      });
  }

  function updateMoviesList() {
    axios
      .get(`/api/user/administrator/movies`)
      .then(function (response) {
        setMoviesList(response.data);
      })
      .catch(function (error) {
        alert(error.data);
      });
  }

  let componenteRender;

  if (tab == 0) {
    componenteRender = (
      <Box m={2} ml={5} mb={5}>
        <Grid container spacing={4}>
          {seriesList.map((media, index) => (
            <Grid item xs={4} key={index}>
              <MediaUser
                media={media}
                anadirPendientes={addToWatch}
                abrirDescripcion={openDialogMedia}
                tipo={tipo}
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
          {moviesList.map((media, index) => (
            <Grid item xs={4} key={index}>
              <MediaUser
                media={media}
                anadirPendientes={addToWatch}
                abrirDescripcion={openDialogMedia}
                tipo={tipo}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  function toCollections(event){
    event.preventDefault();

    navigate(`/${user}/collections`);

  }
  useEffect(() => {
    actualizarUser();
    updateMoviesList();
    updateSeriesList();
  }, []);

  return (
    <div>
      <Box id="encabezado" height>
        <Typography id="title" variant="h1" component="h2" gutterBottom>
          Bienvenido, {user}
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
          <BottomNavigationAction label="Series" />
          <BottomNavigationAction label="Películas" />
        </BottomNavigation>
      </Paper>
      <Box m={1} ml={5} mb={5}>
      <Button variant="contained" color="primary" onClick={toCollections}>
          Mis Listas
        </Button>
      </Box>

      <MediaDialog

          abrirDialogo={abrirDialogoMedia}
          cerrarDialogo={closeDialogMedia}
          guardarScore={saveScore}
          media={mediaActual}

      />
      {componenteRender}
    </div>
  );
}
