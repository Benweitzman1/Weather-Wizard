import React, { useState } from "react";
import { AppBar, IconButton, Box, Switch, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";

function SideBar({ darkMode, setDarkMode, isSmallScreen }) {
  const [menuOpen, setMenuOpen] = useState(false);
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
          width: isSmallScreen ? "80%" : "100%",
          fontSize: isSmallScreen ? "1rem" : "1rem",
          textTransform: "none",
          transition: "transform 0.35s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
        }}
      >
        <Box
          display="flex"
          flexDirection={isSmallScreen ? "row" : "column"}
          alignItems="center"
          height={isSmallScreen ? "18px" : "auto"}
          width={"auto"}
          paddingLeft={isSmallScreen ? "1rem" : "0"}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            icon={
              darkMode ? (
                <LightModeIcon
                  fontSize="3rem"
                  color="primary"
                  style={{ marginTop: "1px" }}
                />
              ) : (
                <DarkModeIcon
                  fontSize="3rem"
                  color="primary"
                  style={{ marginTop: "1px" }}
                />
              )
            }
            checkedIcon={
              darkMode ? (
                <LightModeIcon
                  fontSize="3rem"
                  color="primary"
                  style={{ marginTop: "1px" }}
                />
              ) : (
                <DarkModeIcon
                  fontSize="30rem"
                  color="primary"
                  style={{ marginTop: "1px" }}
                />
              )
            }
          />
        </Box>

        {menuOpen && (
          <Box
            display="flex"
            flexDirection={isSmallScreen ? "row" : "column"}
            justifyContent="flex-start"
            alignItems="center"
            height="100%"
          >
            {buttonComponent("/", <HomeIcon fontSize="3rem" />, "Home")}
            {buttonComponent(
              "/favorites",
              <FavoriteIcon fontSize="3rem" />,
              "Favorites"
            )}
          </Box>
        )}
      </AppBar>
    </ThemeProvider>
  );
}

export default SideBar;
