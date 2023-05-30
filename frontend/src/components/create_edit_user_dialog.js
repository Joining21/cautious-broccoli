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
  guardarUser,
  user,
  setUser,
  password,
  setPassword,
  name,
  setName,
  surname,
  setSurname,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  id,
}) {
  function saveUser() {
    const userData = {
      user: user,
      password: password,
      name: name,
      surname: surname,
      email: email,
      phoneNumber: phoneNumber,
    };

    if (id !== -1) userData._id = id;

    guardarUser(userData);
  }

  const handleUser = (newValue) => {
    setUser(newValue.target.value);
  };
  const handlePassword = (newValue) => {
    setPassword(newValue.target.value);
  };
  const handleName = (newValue) => {
    setName(newValue.target.value);
  };
  const handleSurname = (newValue) => {
    setSurname(newValue.target.value);
  };
  const handleEmail = (newValue) => {
    setEmail(newValue.target.value);
  };
  const handlePhoneNumber = (newValue) => {
    setPhoneNumber(newValue.target.value);
  };

  return (
    <div>
      <Dialog open={abrirDialogo}>
        <DialogTitle id="title_dialog">Crea o modifica tu cromo</DialogTitle>
        <DialogContent>
          <TextField
            required
            value={user}
            onChange={handleUser}
            id="outlined-basic"
            label={user ? "" : "Username"}
            variant="outlined"
            fullWidth
            margin="dense"
          />

          <TextField
            required
            value={password}
            onChange={handlePassword}
            id="outlined-basic"
            label={password ? "" : "Password"}
            type="password"
            variant="outlined"
            fullWidth
            margin="dense"
          />

          <TextField
            value={name}
            onChange={handleName}
            id="outlined-basic"
            label={name ? "" : "Name"}
            variant="outlined"
            fullWidth
            margin="dense"
          />

          <TextField
            value={surname}
            onChange={handleSurname}
            id="outlined-basic"
            label={surname ? "" : "Surname"}
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <TextField
            value={email}
            onChange={handleEmail}
            id="outlined-basic"
            label={email ? "" : "Email"}
            variant="outlined"
            fullWidth
            margin="dense"
          />

          <TextField
            value={phoneNumber}
            onChange={handlePhoneNumber}
            id="outlined-basic"
            label={phoneNumber ? "" : "Phonenumber"}
            type="number"
            inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*', //Comprobar si funciona
            }}
            variant="outlined"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveUser}>Guardar</Button>
          <Button onClick={cerrarDialogo}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
