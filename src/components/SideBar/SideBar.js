import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Switch, Button, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';

function SideBar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

    function buttonComponent(path, icon, label) {
        return (
            <Button
            component={Link}
            to={path}
            color="inherit"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                textTransform: 'none',
                transition: 'transform 0.35s',  // animation duration
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.3)'}  // increase size on hover
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}    // return to normal size after hover
            >
            <IconButton color="inherit" style={{ padding: '0' }}>
                {React.cloneElement(icon, { fontSize: "Large" })}
            </IconButton>
            {label}
            </Button>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar
                position="static"
                style={{ 
                    backgroundColor: '#333', 
                    flexDirection: 'row', // Change this to row for side by side arrangement
                    height: '90vh',
                    width: menuOpen ? '180px' : '50px',
                    padding: '1rem 0',
                    borderRadius: '15px',
                    margin: '2%',
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    // justifyContent="space-between"
                    alignItems="center"
                    height="100%"
                >
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <Switch
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        icon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    />
                </Box>

                {menuOpen && (
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        alignItems="center"
                        height="100%"
                    >
                        {buttonComponent("/", <HomeIcon />, "Home")}
                        {buttonComponent("/favorites", <FavoriteIcon />, "Favorites")}
                        {buttonComponent("/map", <MapIcon />, "Map")}
                        {buttonComponent("/settings", <SettingsIcon />, "Settings")}
                    </Box>
                )}
            </AppBar>
        </ThemeProvider>
    );
}

export default SideBar;
