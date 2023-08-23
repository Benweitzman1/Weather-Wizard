import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';


function FiveDayForecast({ getTemperature }) {
    const weatherData = useSelector(state => state.weather);
    const theme = useTheme();

    const getDayOfWeek = (dateString) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const date = new Date(dateString);
        return days[date.getDay()];
    };

  return (
    <Paper elevation={15} style={{
      padding: '20px',
      marginTop: '10px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '15px',
    }}>
      <Typography variant="h6" style={{ marginBottom: '10px' }}>Weekly</Typography>
      <Grid container spacing={0} justifyContent="space-between">
        {weatherData.forecast.DailyForecasts.map((day, index) => (
          <Grid item xs key={index} style={{ textAlign: 'center', border: '1px solid black', padding: '10px', margin: '0 5px' }}>
            <Typography variant="body1">{index === 0 ? 'Today' : getDayOfWeek(day.Date)}</Typography>
            <Typography variant="body1">{getTemperature(day.Temperature.Maximum.Value)}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default FiveDayForecast;
