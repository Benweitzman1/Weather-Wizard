import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Box,
  Switch,
  Button,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";

function SideBar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  function buttonComponent(path, icon, label) {
    return (
      <Button
        component={Link}
        to={path}
        color="inherit"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSmallScreen ? "0.5rem" : "0.5rem",
          // width: '100%',
          width: isSmallScreen ? "80%" : "100%",
          fontSize: isSmallScreen ? "1rem" : "1rem",
          textTransform: "none",
          transition: "transform 0.35s", // animation duration
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")} // increase size on hover
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // return to normal size after hover
      >
        <IconButton color="inherit" style={{ padding: "0" }}>
          {React.cloneElement(icon, { fontSize: "large" })}
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
          backgroundColor: "#333",
          flexDirection: isSmallScreen ? "column" : "row",
          height: isSmallScreen ? (menuOpen ? "150px" : "50px") : "auto",
          width: isSmallScreen ? "auto" : menuOpen ? "180px" : "50px",
          padding: "1rem 0",
          borderRadius: "15px",
          margin: "2%",
          justifyContent: isSmallScreen ? "center" : "",
          //   alignItems: "center"
        }}
      >
        <Box
          display="flex"
          flexDirection={isSmallScreen ? "row" : "column"}
          alignItems="center"
          //   height={'auto'}
          height={isSmallScreen ? "18px" : "auto"}
          width={"auto"}
          //   width={isSmallScreen ? 'auto' : 'auto'}
          paddingLeft={isSmallScreen ? "1rem" : "0"}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMenuOpen(!menuOpen)}
            //   style={{ marginLeft: isSmallScreen ? '10px' : '', marginTop: isSmallScreen ? '-0' : '0' }}
          >
            <MenuIcon />
          </IconButton>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            icon={
              darkMode ? (
                <LightModeIcon fontSize="3rem" color="defualt" />
              ) : (
                <DarkModeIcon fontSize="30rem" />
              )
            }
            checkedIcon={
              darkMode ? (
                <LightModeIcon fontSize="3rem" color="primary" />
              ) : (
                <DarkModeIcon fontSize="30rem" />
              )
            }
          />
        </Box>

        {menuOpen && (
          <Box
            display="flex"
            flexDirection={isSmallScreen ? "row" : "column"}
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            //   paddingBottom={isSmallScreen ? '6rem' : '0'}
            //   marginTop={isSmallScreen ? '10px' : '0'}
          >
            {buttonComponent("/", <HomeIcon fontSize="3rem" />, "Home")}
            {buttonComponent(
              "/favorites",
              <FavoriteIcon fontSize="3rem" />,
              "Favorites"
            )}
            {buttonComponent("/map", <MapIcon fontSize="3rem" />, "Map")}
            {buttonComponent(
              "/settings",
              <SettingsIcon fontSize="3rem" />,
              "Settings"
            )}
          </Box>
        )}
      </AppBar>
    </ThemeProvider>
  );
}

export default SideBar;
