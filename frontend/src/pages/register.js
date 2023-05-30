
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import User from '../components/user_card';
import axios from 'axios';

const theme = createTheme();

export default function Register() {

    const navigate = useNavigate();
    
  const handleSubmit = (event) => {  //evento para login
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var user = data.get("user");
    var password = data.get("password");
    var name = data.get("user");
    var surname = data.get("password");
    var email = data.get("user");
    var phoneNumber = data.get("password");

    
    axios
      .post("/api/register", {
        user: user,
        password: password,
        name: name,
        surname: surname,
        email: email,
        phoneNumber: phoneNumber,
      })
      .then(function (response) {
        if(response.data.admin){
            navigate(`/api/login`)
        }
       
      })
      .catch(function (error) {
        alert(error.response);
      });
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
        
          </Box>
        </Box>
      </Container>
      
    </ThemeProvider>
  );
}