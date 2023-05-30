import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  
  export default function Movie({
    movie,
    editarMovie,
    eliminarMovie,
  }) {
    function deleteMovie() {
      eliminarMovie(movie._id);
    }
  
    function editMovie() {
      editarMovie(movie._id);
    }
  
    return (
      <Card sx={{ width: 400 }}  variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Titulo:
          </Typography>
          <Typography color="textSecondary">{movie.title} </Typography>
          <Typography variant="h5" component="h2" >
            Sinopsis:
          </Typography>
          <Typography color="textSecondary" sx={{ maxHeight: '6em', overflowY: 'auto' }}>{movie.sinopsis}</Typography>
          <Typography variant="h5" component="h2">
            Genero:
          </Typography>
          <Typography color="textSecondary">{movie.genre}</Typography>
          <Typography variant="h5" component="h2">
            Idioma:
          </Typography>
          <Typography color="textSecondary">
            {movie.genre}
          </Typography>
          <Typography variant="h5" component="h2">
            Duracion:
          </Typography>
          <Typography color="textSecondary">{movie.length} min.</Typography>
          <Typography variant="h5" component="h2">
            Fecha de estreno:
          </Typography>
          <Typography color="textSecondary">{movie.releaseDate}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={deleteMovie}>ELIMINAR </Button>
          <Button onClick={editMovie}>EDITAR</Button>
        </CardActions>
      </Card>
    );
  }