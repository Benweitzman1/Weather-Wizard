import React from "react";
import { Typography, Grid, Card } from "@mui/material";

const DayForecast = ({ day, getTemperature, getIcon }) => {
  const getDayOfWeek = (dateString) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <Grid item xs={6} sm={3} style={gridItemStyles}>
      <Card elevation={3} style={cardStyles}>
        <Typography variant="h6" style={typographyDayStyles}>
          {getDayOfWeek(day.Date)}
        </Typography>
        <Typography variant="body1" style={typographyTempStyles}>
          {getTemperature(day.Temperature.Maximum.Value)}
        </Typography>
        <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
          {getIcon(day.Day.Icon) && (
            <img
              src={getIcon(day.Day.Icon)}
              // alt={`Weather condition for ${city.LocalizedName}`}
              style={{ width: "200px", height: "120px" }}
            />
          )}
        </Grid>
      </Card>
    </Grid>
  );
};

const gridItemStyles = {
  textAlign: "center",
};

const cardStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "15px",
  borderRadius: "15px",
  background:
    "linear-gradient(to right, rgba(7,27,82,1) 0%, rgba(0,104,255,1) 100%)",
  color: "white",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  ":hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
};

const typographyDayStyles = {
  marginBottom: "8px",
  fontWeight: "bold",
};

const typographyTempStyles = {
  fontWeight: "lighter",
};

export default DayForecast;
