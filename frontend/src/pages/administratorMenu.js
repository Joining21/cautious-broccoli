import { Button, Typography, Box, Grid } from "@mui/material";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as React from "react";
import '../style.css';
import CreateEditUserDialog from "../components/create_edit_user_dialog";
import CreateEditSerieDialog from "../components/create_edit_serie_dialog";
import CreateEditMovieDialog from "../components/create_edit_movie_dialog";
import User from "../components/user_card";
import Serie from "../components/serie_card";
import Movie from "../components/movie_card";
import axios from 'axios';

export default function AdministratorMenu() {
  const [usersList, setUsersList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);

  const [tab, setTab]= useState(0);

  //Variables user
  const [id, setId] = useState(-1);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [abrirDialogoUser, setAbrirDialogoUser] = useState(false);


  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
 


  const [seasons, setSeasons] = useState(0);
  const [abrirDialogoSerie, setAbrirDialogoSerie] = useState(false);

  const [length, setLength] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [abrirDialogoMovie, setAbrirDialogoMovie] = useState(false);


  function closeDialogUser() {
    setAbrirDialogoUser(false);
  }

  
  function closeDialogoSerie() {
    setAbrirDialogoSerie(false);
  }

  
  function closeDialogoMovie() {
    setAbrirDialogoMovie(false);
  }


  function openEditorUser(idUser) {
    const user = usersList.find((user) => user._id === idUser);
    setId(user._id);
    setUser(user.user);
    setPassword(user.password);
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setAbrirDialogoUser(true);
  }

  function openDialogUser() {
    setId(-1);
    setUser("");
    setPassword("");
    setName("");
    setSurname("");
    setEmail("");
    setPhoneNumber("");
    setAbrirDialogoUser(true);
  }

  function openEditorSerie(idSerie) {
    const serie = seriesList.find((serie) => serie._id === idSerie);
    setId(serie._id);
    setTitle(serie.title);
    setSinopsis(serie.sinopsis);
    setGenre(serie.genre);
    setLanguage(serie.language);
    setSeasons(serie.seasons);
    setImageURL(serie.imageURL);
    setAbrirDialogoSerie(true);
  }

  function openDialogSerie() {
    setId(-1);
    setTitle("");
    setSinopsis("");
    setGenre("");
    setLanguage("");
    setSeasons("");
    setImageURL("")
    setAbrirDialogoSerie(true);
  }

  function openEditorMovie(idMovie) {
    const movie = moviesList.find((movie) => movie._id === idMovie);
    setId(movie._id);
    setTitle(movie.title)
    setSinopsis(movie.sinopsis)
    setGenre(movie.genre)
    setLanguage(movie.language)
    setLength(movie.length)
    setReleaseDate(movie.releaseDate)
    setImageURL(movie.imageURL)
    setAbrirDialogoMovie(true);
  }

  function openDialogMovie() {
    setId(-1);
    setTitle("");
    setSinopsis("");
    setGenre("");
    setLanguage("");
    setLength("");
    setReleaseDate("");
    setImageURL("")
    setAbrirDialogoMovie(true);
  }

 

  const addUser = (newValue) => {
    const indice = usersList.findIndex((user) => user._id === newValue._id);

    if (indice !== -1) {
      axios.put(`/api/user/administrator/${newValue._id}`,newValue)
      .then(function (response) {
       console.log("Usuario editado", newValue)
       updateUsersList()
      })
      .catch(function (error) {
       console.log("Error al editar el usuario")
      })
    
      
    } else {
      axios.post(`/api/register`,newValue)
      .then(function (response) {
       console.log("Usuario añadido")
       updateUsersList()
      })
      .catch(function (error) {
       console.log("Error al añadir el usuario")
      })
    }
    
    setAbrirDialogoUser(false);
  };


  //Recibe directamente el id del usuario a eliminar
  const eliminarUser = (newValue) => {

    axios.delete(`/api/user/administrator/${newValue}`)
    .then(function (response) {
     console.log("Usuario eliminado")
     updateUsersList()
    })
    .catch(function (error) {
     console.log("Error al eliminar el usuario")
    })

    
  };


  const addSerie = (newValue) => {
    const indice = seriesList.findIndex((serie) => serie._id === newValue._id);

    if (indice !== -1) {
      axios.put(`/api/user/administrator/series/${newValue._id}`,newValue)
      .then(function (response) {
       console.log("Serie editada", newValue)
       updateSeriesList()
      })
      .catch(function (error) {
       console.log("Error al editar la serie")
      })
    
      
    } else {
      axios.post(`/api/user/administrator/series`,newValue)
      .then(function (response) {
       console.log("Serie añadida")
       updateSeriesList()
      })
      .catch(function (error) {
       console.log("Error al añadir la serie")
      })
    }
    
    setAbrirDialogoSerie(false);
  };
  //Recibe directamente el id de la serie a eliminar
  const eliminarSerie = (newValue) => {

    axios.delete(`/api/user/administrator/series/${newValue}`)
    .then(function (response) {
     console.log("Serie eliminada")
     updateSeriesList()
    })
    .catch(function (error) {
     console.log("Error al eliminar la serie")
    })

    
  };

  const addMovie = (newValue) => {
    const indice = moviesList.findIndex((movie) => movie._id === newValue._id);

    if (indice !== -1) {
      axios.put(`/api/user/administrator/movies/${newValue._id}`,newValue)
      .then(function (response) {
       console.log("Pelicula editada", newValue)
       updateMoviesList()
      })
      .catch(function (error) {
       console.log("Error al editar la pelicula")
      })
    
      
    } else {
      axios.post(`/api/user/administrator/movies`,newValue)
      .then(function (response) {
       console.log("Pelicula añadida")
       updateMoviesList()
      })
      .catch(function (error) {
       console.log("Error al añadir la pelicula")
      })
    }
    
    setAbrirDialogoMovie(false);
  };
  //Recibe directamente el id de la pelicula a eliminar
  const eliminarMovie = (newValue) => {

    axios.delete(`/api/user/administrator/movies/${newValue}`)
    .then(function (response) {
     console.log("Pelicula eliminada")
     updateMoviesList()
    })
    .catch(function (error) {
     console.log("Error al eliminar la pelicula")
    })

    
  };

  function updateUsersList(){

    axios.get(`/api/user/administrator`)
    .then(function (response) {
     setUsersList(response.data)
    })
    .catch(function (error) {
     alert(error.data)
    })

  }

  function updateSeriesList(){

    axios.get(`/api/user/administrator/series`)
    .then(function (response) {
     setSeriesList(response.data)
    })
    .catch(function (error) {
     alert(error.data)
    })

  }

  function updateMoviesList(){

    axios.get(`/api/user/administrator/movies`)
    .then(function (response) {
     setMoviesList(response.data)
    })
    .catch(function (error) {
     alert(error.data)
    })

  }

  let componenteRender;

  if(tab==0){

    
    componenteRender= <Box m={2} ml={5} mb={5}>
    <Box m={1} ml={5} mb={5}>
      <Button variant="contained" color="primary" onClick={openDialogUser}>
          Añadir Usuario
        </Button>
    </Box>
    <Grid container spacing={1}>
      
      {usersList.map((user, index) => (
        <Grid item xs={4} key={index}>
          <User
            user={user}
            editarUser={openEditorUser}
            eliminarUser={eliminarUser}
          />
        </Grid>
      ))}
    </Grid>
    
  </Box>
  }else if(tab==1){

   
    componenteRender=  <Box m={2} ml={5} mb={5}>
    <Box m={1} ml={5} mb={5}>
      <Button variant="contained" color="primary" onClick={openDialogSerie}>
          Añadir Serie
        </Button>
    </Box>
    <Grid container spacing={4}>
     
     {seriesList.map((serie, index) => (
       <Grid item xs={4} key={index}>
         <Serie
           serie={serie}
           editarSerie={openEditorSerie}
           eliminarSerie={eliminarSerie}
         />
       </Grid>
     ))}
   </Grid>

  </Box>
  }else if(tab==2){
    
    componenteRender= <Box m={2} ml={5} mb={5}>

    <Box m={1} ml={5} mb={5}>
      <Button variant="contained" color="primary" onClick={openDialogMovie}>
          Añadir Película
      </Button>
    </Box>
    <Grid container spacing={4}>
     
     {moviesList.map((movie, index) => (
       <Grid item xs={4} key={index}>
         <Movie 
           movie={movie}
           editarMovie={openEditorMovie}
           eliminarMovie={eliminarMovie}
         />
       </Grid>
     ))}
   </Grid>

  </Box>
  }
  useEffect(()=>{

    updateUsersList()
    updateMoviesList()
    updateSeriesList()
    
  },[])



 

  return (
    <div>
      <Box id="encabezado" height>
        <Typography id="title" variant="h1" component="h2" gutterBottom>
          Menu del Administrador
        </Typography>
      </Box>

      <Paper sx={{width:'100%', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={tab}
          onChange={(event, newValue) => {
            console.log(newValue)
            setTab(newValue);
          }}
        >
          <BottomNavigationAction label="Usuarios" />
          <BottomNavigationAction label="Series"/>
          <BottomNavigationAction label="Películas"/>
        </BottomNavigation>
      </Paper>

      <CreateEditUserDialog
        abrirDialogo={abrirDialogoUser}
        cerrarDialogo={closeDialogUser}
        guardarUser={addUser}
        user={user}
        setUser={setUser}
        password={password}
        setPassword={setPassword}
        name={name}
        setName={setName}
        surname={surname}
        setSurname={setSurname}
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        id={id}
      />

      <CreateEditSerieDialog
        abrirDialogo={abrirDialogoSerie}
        cerrarDialogo={closeDialogoSerie}
        guardarSerie={addSerie}
        imagenURL={imageURL}
        setImagenURL={setImageURL}
        title={title}
        setTitle={setTitle}
        sinopsis={sinopsis}
        setSinopsis={setSinopsis}
        genre={genre}
        setGenre={setGenre}
        language={language}
        setLanguage={setLanguage}
        seasons={seasons}
        setSeasons={setSeasons}
        id={id}
      />

      <CreateEditMovieDialog
        abrirDialogo={abrirDialogoMovie}
        cerrarDialogo={closeDialogoMovie}
        guardarMovie={addMovie}
        imagenURL={imageURL}
        setImagenURL={setImageURL}
        title={title}
        setTitle={setTitle}
        sinopsis={sinopsis}
        setSinopsis={setSinopsis}
        genre={genre}
        setGenre={setGenre}
        language={language}
        setLanguage={setLanguage}
        length={length}
        setLength={setLength}
        releaseDate={releaseDate}
        setReleaseDate={setReleaseDate}
        id={id}
      />
      
      {componenteRender}
    </div>
  );
}
