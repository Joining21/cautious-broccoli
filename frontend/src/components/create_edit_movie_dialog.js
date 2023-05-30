import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function CreateEditUserDialog({
  abrirDialogo,
        cerrarDialogo,
        guardarMovie,
        title,
        setTitle,
        sinopsis,
        setSinopsis,
        genre,
        setGenre,
        language,
        setLanguage,
        length,
        setLength,
        releaseDate,
        setReleaseDate,
        imagenURL,
        setImagenURL,
        id
}) {
  function saveMovie() {
    const movieData = {
      title: title,
      sinopsis: sinopsis,
      genre: genre,
      language: language,
      length:length,
      releaseDate: releaseDate
    };

    if (id !== -1) movieData._id = id;

    guardarMovie(movieData);
  }

  const handleTitle = (newValue) => {
    setTitle(newValue.target.value);
  };
  const handleURL = (newValue) => {
    setImagenURL(newValue.target.value);
  };
  const handleSinopsis = (newValue) => {
    setSinopsis(newValue.target.value);
  };
  const handleGenre = (newValue) => {
    setGenre(newValue.target.value);
  };
  const handleLanguage = (newValue) => {
    setLanguage(newValue.target.value);
  };
  const handleLength = (newValue) => {
    setLength(newValue.target.value);
  };
  
  const handleReleaseDate = (newValue) => {
    setReleaseDate(newValue.format("YYYY/MM/DD"));
  };



  return (
    <div>
      <Dialog open={abrirDialogo}>
        <DialogTitle id="title_dialog">Crea o modifica una pelicula</DialogTitle>
        <DialogContent>
          <TextField
            required
            value={title}
            onChange={handleTitle}
            id="outlined-basic"
            label={title ? "" : "Title"}
            variant="outlined"
            fullWidth
            margin="dense"
          />
         <TextField
            
            value={imagenURL}
            onChange={handleURL}
            id="outlined-basic"
            label={imagenURL ? "" : "URL Imagen"}
            variant="outlined"
            fullWidth
            margin="dense"
          />

          <TextField
            value={sinopsis}
            onChange={handleSinopsis}
            id="outlined-basic"
            label={sinopsis ? "" : "Sinopsis"}
            multiline
            rows={4}
            
            fullWidth
            margin="dense"
          />

          <TextField
            value={genre}
            onChange={handleGenre}
            id="outlined-basic"
            label={genre ? "" : "Genre"}
            variant="outlined"
            fullWidth
            margin="dense"
          />

          <TextField
            value={language}
            onChange={handleLanguage}
            id="outlined-basic"
            label={language ? "" : "Language"}
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <TextField
            value={length}
            type="number"
            onChange={handleLength}
            id="outlined-basic"
            label={length ? "" : "Length"}
            variant="outlined"
            fullWidth
            margin="dense"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={handleReleaseDate}
              margin="dense"
              value={dayjs(releaseDate)}
              

            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveMovie}>Guardar</Button>
          <Button onClick={cerrarDialogo}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
