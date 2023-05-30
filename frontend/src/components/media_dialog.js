import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
  CardMedia,
  Typography,
  Rating
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function MediaDialog({
  abrirDialogo,
  cerrarDialogo,
  media,
  puntuacionMedia,
  setPuntuacionMedia,
  tipo
}) {
  const handlePuntuacion=(newValue)=> {
    
    setPuntuacionMedia(newValue.target.value)
  }



  return (
    <div>
      <Dialog open={abrirDialogo} >
        <DialogTitle id="title_dialog">{media.title}</DialogTitle>
        <DialogContent>

        <CardMedia
        sx={{ height: 750 }}
        image={media.imageURL}
      />
      <Typography gutterBottom variant="h5" component="div">
         Sinopsis: {media.sinopsis}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Género:  {media.genre}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Idioma: {media.language}
      </Typography>
      {media.length && (
      <Typography gutterBottom variant="h5" component="div">
        Duración: {media.length}
      </Typography>
      )}
       {media.releaseDate && (
      <Typography gutterBottom variant="h5" component="div">
        Fecha de estreno: {media.releaseDate}
      </Typography>
      )}
       {media.seasons && (
      <Typography gutterBottom variant="h5" component="div">
        Temporadas: {media.seasons}
      </Typography>
      )}

    {tipo>0 && (
       <TextField
       value={puntuacionMedia}
       type= "number"
       onChange={handlePuntuacion}
       id="outlined-basic"
       label={"Rate"}
       inputProps={{
        min: 1,
        max: 10,
      }}
       variant="outlined"
       margin="dense"
     />
      )}


        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarDialogo}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
