import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  
  export default function Serie({
    serie,
    editarSerie,
    eliminarSerie,
  }) {
    function deleteSerie() {
      eliminarSerie(serie._id);
    }
  
    function editSerie() {
      editarSerie(serie._id);
    }
  
    return (
      <Card sx={{ width: 400 }}  variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Titulo:
          </Typography>
          <Typography color="textSecondary">{serie.title}</Typography>
          <Typography variant="h5" component="h2">
            Sinopsis:
          </Typography>
          <Typography color="textSecondary" sx={{ maxHeight: '6em', overflowY: 'auto' }}>{serie.sinopsis}</Typography>
          <Typography variant="h5" component="h2">
            Genero:
          </Typography>
          <Typography color="textSecondary">{serie.genre}</Typography>
          <Typography variant="h5" component="h2">
            Idioma:
          </Typography>
          <Typography color="textSecondary">
            {serie.genre}
          </Typography>
          <Typography variant="h5" component="h2">
            Temporadas:
          </Typography>
          <Typography color="textSecondary">{serie.seasons}</Typography>
          
        </CardContent>
        <CardActions>
          <Button onClick={deleteSerie}>ELIMINAR </Button>
          <Button onClick={editSerie}>EDITAR</Button>
        </CardActions>
      </Card>
    );
  }