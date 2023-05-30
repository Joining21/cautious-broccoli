
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

export default function Login() {

    const navigate = useNavigate();
    
  const handleSubmit = (event) => {  //evento para login
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var user = data.get("user");
    var password = data.get("password");
    
    axios
      .post("/api/login", {
        user: user,
        password: password,
      })
      .then(function (response) {
        if(response.data.admin){
            navigate(`/user/administrator`)
        }else{
            navigate(`/${user}`);
        }
       
      })
      .catch(function (error) {
        alert(error.response);
      });
  };

  const handleLink = (event) => {
    navigate("/api/register"); //navegar a lapagina de registro
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
              margin="normal"
              required
              fullWidth
              id="user"
              label="User"
              name="user"
              autoComplete="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">  
                {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" onClick={handleLink} variant="body2">
                  
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      
    </ThemeProvider>
  );
}