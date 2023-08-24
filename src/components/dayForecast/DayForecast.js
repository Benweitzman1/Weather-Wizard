import React from "react";
import { Typography, Grid, Card } from "@mui/material";

const DayForecast = ({ day, getTemperature, getIcon }) => {
  const getDayOfWeek = (dateString) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);
    return days[date.getDay()];
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
      "linear-gradient(to right, rgba(14,50,152,1) 0%, rgba(0,204,255,1) 100%)",
    color: "white",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(0, 0, 0, 0.24)",
    },
  };

  const typographyDayStyles = {
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const typographyTempStyles = {
    fontWeight: "lighter",
  };

  return (
    <Grid item xs={6} sm={6} md={3} style={gridItemStyles}>
      <Card elevation={3} sx={cardStyles}>
        <Typography variant="h6" style={typographyDayStyles}>
          {getDayOfWeek(day.Date)}
        </Typography>
        <Typography variant="body1" style={typographyTempStyles}>
          {getTemperature(day.Temperature.Maximum.Value)}
        </Typography>
        <Typography variant="body1" style={typographyTempStyles}>
          {day.Day.IconPhrase}
        </Typography>
        <Grid item xs={12} style={{ marginTop: "5px", textAlign: "center" }}>
          {getIcon(day.Day.Icon) && (
            <img
              src={getIcon(day.Day.Icon)}
              style={{ width: "80px", height: "48px" }}
            />
          )}
        </Grid>
      </Card>
    </Grid>
  );
};

export default DayForecast;
