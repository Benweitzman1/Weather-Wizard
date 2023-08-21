import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

const Header = ({ darkMode, setDarkMode }) => (
  <AppBar position="static" style={{ backgroundColor: '#333' }}>
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Weather Wizard
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
       <Switch 
        checked={darkMode} 
        onChange={() => setDarkMode(!darkMode)}
      />
      <Typography variant="body1" style={{ marginLeft: '10px' }}>
        Dark Mode
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;




