import React from "react";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";

function FavoritesList({ favoriteCities, onSelectCity }) {
  const handleCityClick = (city) => {
    console.log({ city });
    onSelectCity(city);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      flexWrap="wrap"
      gap={isSmallScreen ? 5 : 2}
      marginTop={isSmallScreen ? 2 : 5}
      marginLeft={isSmallScreen ? 0 : 3}
    >
      {favoriteCities.map((favorite) => (
        <Paper
          key={favorite.data.id}
          elevation={3}
          sx={{
            width: 150,
            height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            cursor: "pointer",
            backgroundColor: "rgba(50,104,255,1)",
            boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.12)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 12px 24px 0px rgba(0, 0, 0, 0.15)",
              backgroundColor: "rgba(0, 0, 0, 0.24)",
            },
            borderRadius: "15px",
          }}
          onClick={() => handleCityClick(favorite)}
        >
          <Typography variant="body1">{favorite.data.cityName}</Typography>
          <Typography variant="body2">
            {favorite.data.TemperatureValue}°C
          </Typography>
          <Typography variant="body2">{favorite.data.WeatherText}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default FavoritesList;
