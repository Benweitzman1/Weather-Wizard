import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function FavoritesList({ favoriteCities, onSelectCity }) {
  const handleCityClick = (city) => {
    onSelectCity(city);
  };

  return (
    <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2} marginTop={2}>
      {favoriteCities.map(favorite => (
        <Paper 
          key={favorite.data.id}
          elevation={2}
          sx={{
            width: 150,
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
          onClick={() => handleCityClick(favorite)}
        >
          <Typography variant="body1">{favorite.data.cityName}</Typography>
          <Typography variant="body2">{favorite.data.TemperatureValue}°C</Typography>
          <Typography variant="body2">{favorite.data.WeatherText}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default FavoritesList;
