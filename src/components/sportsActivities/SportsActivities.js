import React from "react";
import { useSelector } from "react-redux";
import { Typography, Grid, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";

function SportsActivities({ darkMode }) {
  const weatherData = useSelector((state) => state.weather);

  const colorTexts = darkMode ? blue[100] : blue[950];

  const paperStyles = {
    padding: "20px",
    marginTop: "20px",
    backgroundColor: "transparent",
    borderRadius: "15px",
  };

  const titleStyles = {
    marginBottom: "10px",
    fontWeight: 600,
    letterSpacing: "1px",
    textShadow: darkMode ? "2px 2px 4px rgba(0, 0, 0, 0.2)" : "none",
  };

  const sportStyles = {
    color: colorTexts,
    fontWeight: 500,
    letterSpacing: "0.8px",
    textShadow: darkMode ? "1px 1px 3px rgba(0, 0, 0, 0.1)" : "none",
  };

  if (
    !weatherData.sportsActivities ||
    !Object.keys(weatherData.sportsActivities).length
  ) {
    // No sports activities available
    return null; // Render nothing if there are no sports activities
  }

  return (
    <Paper elevation={15} style={paperStyles}>
      <Typography variant="h5" style={titleStyles}>
        Sports Activities
      </Typography>
      <Grid container spacing={2} justifyContent="space-between">
        {Object.entries(weatherData.sportsActivities).map(
          ([, sportData], index) => (
            <Grid item xs={12} md={4} key={index}>
              <Typography variant="body1" style={sportStyles}>
                {sportData.Name.split(" ")[0]}: {sportData.Category}
              </Typography>
            </Grid>
          )
        )}
      </Grid>
    </Paper>
  );
}

export default SportsActivities;
