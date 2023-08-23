import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, Box, Paper, Button, Tooltip } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { RiHeartAddLine, RiHeartFill } from "react-icons/ri";
import { addToFavorites, removeFromFavorites } from '../../redux/slices/favoritesSlice';

function CurrentWeather({ city, getTemperature,isCelsius, setIsCelsius, fahrenheitToCelsius }) {
    const weatherData = useSelector(state => state.weather);
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();
    const theme = useTheme();

    const isFavorite = (cityID) => {
        return favorites.some(favorite => favorite.data.id === cityID);
    };

    const toggleTemperatureScale = () => {
        setIsCelsius(!isCelsius);
    };
    
    const toggleFavorite = () => {
        const cityData = {
          currentWeather: weatherData.currentWeather[0],
          forecast: weatherData.forecast,
          data: {
            cityName: city.LocalizedName,
            id: city.Key,
            WeatherText: weatherData.currentWeather[0].WeatherText,
            TemperatureValue: fahrenheitToCelsius(weatherData.currentWeather[0].Temperature.Imperial.Value),
          }
        };
    
        if (isFavorite(cityData.data.id)) {
          dispatch(removeFromFavorites(cityData));
        } else {
          dispatch(addToFavorites(cityData));
        }
      }

  return (
    <Paper elevation={15} style={{
      padding: '20px',
      marginTop: '10px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '15px',
    }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8} style={{ display: 'flex', alignItems: 'center', marginBottom: '65px' }}>
          <div>
            <Typography variant="h4" style={{ color: blue[800] }}>{city.LocalizedName}</Typography>
            <Typography variant="h5" style={{ color: blue[600] }}>{getTemperature(weatherData.currentWeather[0].Temperature.Imperial.Value)}</Typography>
            <Typography variant="h5" style={{ color: grey[600] }}>{weatherData.currentWeather[0].WeatherText}</Typography>
          </div>
          
        </Grid>
      <Grid item xs={12} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ width: '100%', marginBottom: '40px' }}>
                  <Button
                      onClick={toggleTemperatureScale}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      style={{ 
                        marginRight: '10px', 
                        textTransform: 'none', 
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      Toggle to {isCelsius ? "Fahrenheit" : "Celsius"}
                  </Button>
                  <Tooltip title={isFavorite(city.Key) ? "Remove from Favorites" : "Add to Favorites"} enterDelay={500} leaveDelay={200}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        ml={3}
                        onClick={() => toggleFavorite(city.LocalizedName)}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        {isFavorite(city.Key) ? 
                            <RiHeartFill fontSize="large" style={{ color: blue[500] }} /> : 
                            <RiHeartAddLine fontSize="large" style={{ color: blue[500] }} />
                        }
                        
                    </Box>
                </Tooltip>
                </div>
              </Grid>
            </Grid>
          </Paper>
  );
}

export default CurrentWeather;

