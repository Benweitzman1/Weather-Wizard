import React from "react";
import { useSelector } from "react-redux";
import { Typography, Grid, Paper } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

function SportsActivities({ darkMode }) {
  const weatherData = useSelector((state) => state.weather);

  const colorTexts = darkMode ? blue[100] : blue[950];

  const paperStyles = {
    padding: "20px",
    marginTop: "20px",
    backgroundColor: "transparent",
    borderRadius: "15px",
  };

  console.log("11111111111111111111111");
  console.log(weatherData);
  console.log("11111111111111111111111");
  if (
    !weatherData.sportsActivities ||
    !Object.keys(weatherData.sportsActivities).length
  ) {
    // No sports activities available
    return null; // Render nothing if there are no sports activities
  }

  return (
    <Paper elevation={15} style={paperStyles}>
      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Sports Activities
      </Typography>
      <Grid container spacing={2} justifyContent="space-between">
        {Object.entries(weatherData.sportsActivities).map(
          ([sportName, sportData], index) => (
            <Grid item key={index}>
              <Typography style={{ color: colorTexts }}>
                {sportName}: {sportData.Category}
              </Typography>
            </Grid>
          )
        )}
      </Grid>
    </Paper>
  );
}

export default SportsActivities;
