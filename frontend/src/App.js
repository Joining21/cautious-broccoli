import './App.css';
import Login from "./pages/login.js";
import AdministratorMenu from "./pages/administratorMenu.js";
import UserMenu from './pages/userMenu';
import UserCollections from './pages/user_collections';
import Register from './pages/register';

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/user/administrator" element={<AdministratorMenu/>} />
          <Route path="/:user/" element={<UserMenu/>} />
          <Route path="/:user/collections" element={<UserCollections/>} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
