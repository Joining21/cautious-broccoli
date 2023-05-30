import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

export default function CreateEditUserDialog({
  abrirDialogo,
        cerrarDialogo,
        guardarSerie,
        imagenURL,
        setImagenURL,
        title,
        setTitle,
        sinopsis,
        setSinopsis,
        genre,
        setGenre,
        language,
        setLanguage,
        seasons,
        setSeasons,
        id
}) {
  function saveSerie() {
    const serieData = {
      title: title,
      sinopsis: sinopsis,
      genre: genre,
      language: language,
      seasons:seasons
    };

    if (id !== -1) serieData._id = id;

    guardarSerie(serieData);
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
  const handleSeasons = (newValue) => {
    setSeasons(newValue.target.value);
  };


  return (
    <div>
      <Dialog open={abrirDialogo}>
        <DialogTitle id="title_dialog">Crea o modifica una serie</DialogTitle>
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
            value={seasons}
            type= "number"
            onChange={handleSeasons}
            id="outlined-basic"
            label={seasons ? "" : "Seasons"}
            variant="outlined"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveSerie}>Guardar</Button>
          <Button onClick={cerrarDialogo}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
