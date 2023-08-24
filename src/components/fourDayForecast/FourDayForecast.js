import React from "react";
import DayForecast from "../dayForecast/DayForecast";
import { useSelector } from "react-redux";
import { Typography, Grid, Paper } from "@mui/material";

function FourDayForecast({ getTemperature, getIcon, darkMode }) {
  const weatherData = useSelector((state) => state.weather);

  const titleStyles = {
    marginBottom: "10px",
    fontWeight: 600,
    letterSpacing: "1px",
    textShadow: darkMode ? "2px 2px 4px rgba(0, 0, 0, 0.2)" : "none",
  };

  const paperStyles = {
    padding: "20px",
    marginTop: "20px",
    marginBottom: "20px",
    backgroundColor: "transparent",
    borderRadius: "15px",
  };

  return (
    <Paper elevation={15} style={paperStyles}>
      <Typography variant="h5" style={{ marginBottom: "10px", ...titleStyles }}>
        Weekly
      </Typography>
      <Grid container spacing={2} justifyContent="space-between">
        {weatherData.forecast.DailyForecasts.slice(1).map((day, index) => (
          <DayForecast
            key={index}
            day={day}
            getTemperature={getTemperature}
            getIcon={getIcon}
          />
        ))}
      </Grid>
    </Paper>
  );
}

export default FourDayForecast;
