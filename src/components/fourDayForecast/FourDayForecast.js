import React from "react";
import DayForecast from "../dayForecast/DayForecast";
import { useSelector } from "react-redux";
import { Typography, Grid, Paper } from "@mui/material";

function FourDayForecast({ getTemperature, getIcon, iconContext }) {
  const weatherData = useSelector((state) => state.weather);

  return (
    <Paper elevation={15} style={paperStyles}>
      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Weekly
      </Typography>
      <Grid container spacing={2} justifyContent="space-between">
        {weatherData.forecast.DailyForecasts.slice(1).map((day, index) => (
          <DayForecast
            key={index}
            day={day}
            getTemperature={getTemperature}
            getIcon={getIcon}
            iconContext={iconContext}
          />
        ))}
      </Grid>
    </Paper>
  );
}

const paperStyles = {
  padding: "20px",
  marginTop: "20px",
  marginBottom: "20px",
  backgroundColor: "transparent",
  borderRadius: "15px",
};

export default FourDayForecast;
