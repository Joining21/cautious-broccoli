import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  
  export default function User({
    user,
    editarUser,
    eliminarUser,
  }) {
    function deleteUser() {
      eliminarUser(user._id);
    }
  
    function editUser() {
      editarUser(user._id);
    }
  
    return (
      <Card sx={{ width: 300 }} style={{ backgroundColor: user.color }}  variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Usuario:
          </Typography>
          <Typography color="textSecondary">{user.user}</Typography>
          <Typography variant="h5" component="h2">
            Nombre:
          </Typography>
          <Typography color="textSecondary">{user.name}</Typography>
          <Typography variant="h5" component="h2">
            Apellidos:
          </Typography>
          <Typography color="textSecondary">{user.surname}</Typography>
          <Typography variant="h5" component="h2">
            Email:
          </Typography>
          <Typography color="textSecondary">
            {user.email}
          </Typography>
          <Typography variant="h5" component="h2">
            Número de teléfono:
          </Typography>
          <Typography color="textSecondary">
            {user.phoneNumber}
          </Typography>

        </CardContent>
        <CardActions>
          <Button onClick={deleteUser}>ELIMINAR </Button>
          <Button onClick={editUser}>EDITAR</Button>
        </CardActions>
      </Card>
    );
  }