import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
    IconButton
  } from "@mui/material";
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import PlayListIcon from '@mui/icons-material/PlaylistAdd';
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
  import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
  import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
  import ReadMoreIcon from '@mui/icons-material/ReadMore';
  import GradeIcon from '@mui/icons-material/Grade';
  
  export default function MediaUser({
    media,
    anadirFavorito,
    eliminarFavorito,
    anadirPendientes,
    eliminarPendientes,
    anadirVisto,
    eliminarVisto,
    abrirDescripcion,
    puntuacion,
    tipo
  }) {

  
    function openDialogMedia(){
      abrirDescripcion(media)
    }
   
    function addFavourite() {
      anadirFavorito(media._id);
    }

    function deleteFavourite() {
      eliminarFavorito(media._id)
    }
  
    function addToWatch() {
      anadirPendientes(media);
    }

    function deleteToWatch() {

      eliminarPendientes(media._id)
    
    }

    function addToSeen(){
      anadirVisto(media._id)
    }

    function deleteToSeen(){
      eliminarVisto(media._id)
    }

    let componenteRender;

    if(tipo==0){
     
      componenteRender= (<Card sx={{ maxWidth: 345}} >
      <CardMedia
        sx={{ height: 500 }}
        image={media.imageURL}
        title={media.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {media.title}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton onClick={addToWatch} aria-label="Añadir a lista">
          <PlayListIcon />
      </IconButton>
      <IconButton onClick={openDialogMedia} aria-label="Añadir a favoritos">
          <ReadMoreIcon />
      </IconButton>
      </CardActions>
    </Card>);
    }else if(tipo==1){

      componenteRender= (<Card sx={{ maxWidth: 345}} >
      <CardMedia
        sx={{ height: 500 }}
        image={media.imageURL}
        title={media.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {media.title}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton onClick={deleteToWatch} aria-label="Eliminar de pendientes">
          <PlaylistRemoveIcon />
      </IconButton>
      <IconButton onClick={addToSeen} aria-label="Añadir a vistos">
          <VisibilityIcon />
      </IconButton>
      <IconButton onClick={openDialogMedia} aria-label="Añadir a favoritos">
          <ReadMoreIcon />
      </IconButton>
      </CardActions>
    </Card>);

    }else if(tipo==2){

      componenteRender= (<Card sx={{ maxWidth: 345}}>
      <CardMedia
        sx={{ height: 500 }}
        image={media.imageURL}
        title={media.title}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
          {media.title}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton onClick={deleteToSeen} aria-label="Eliminar de vistos">
          <VisibilityOffIcon />
      </IconButton>
      <IconButton onClick={addFavourite} aria-label="Eliminar de vistos">
          <FavoriteIcon />
      </IconButton>
      <IconButton onClick={openDialogMedia} aria-label="Añadir a favoritos">
          <ReadMoreIcon />
      </IconButton>
      </CardActions>
    </Card>);

    }else if(tipo==3){

      componenteRender= (<Card sx={{ maxWidth: 345}}>
      <CardMedia
        sx={{ height: 500 }}
        image={media.imageURL}
        title={media.title}
        onClick={openDialogMedia}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {media.title}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton onClick={deleteFavourite} aria-label="Eliminar de favoritos">
          <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={openDialogMedia} aria-label="Añadir a favoritos">
          <ReadMoreIcon />
      </IconButton>
      </CardActions>
    </Card>);

    }

  
    return (
      <div>
         {componenteRender}
      </div>

     
     
    );
  }