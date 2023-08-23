import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, Box, Paper, Tooltip, Switch } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { RiHeartAddLine, RiHeartFill } from "react-icons/ri";
import { addToFavorites, removeFromFavorites } from '../../redux/slices/favoritesSlice';

function CurrentWeather({ city, getTemperature, isCelsius, setIsCelsius, fahrenheitToCelsius }) {
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

      const CustomSwitch = styled(Switch)(({ theme }) => ({
        width: 72, // Overall width of the switch component
        height: 42, // Overall height
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 4,
            '&.Mui-checked': {
                transform: 'translateX(30px)', // Adjusted to accommodate the larger thumb
            },
            '&.Mui-checked + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
            },
        },
        margin: '5px 0 0 15px',
        '& .MuiSwitch-thumb': {
            width: 42, 
            height: 42,
            backgroundColor: 'white',
            boxShadow: theme.shadows[1],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: blue[800], // Making the color consistent for both checked and unchecked state
            transition: 'color 0.3s ease',
        },
        '& .MuiSwitch-track': {
            borderRadius: 20, // Adjusted for rounded corners
            height: 40, // Matched with thumb height
            width: 60, // Increased width
            backgroundColor: theme.palette.grey[300],
            backgroundImage: 'linear-gradient(45deg, #3A8DFF 30%, #86B9FF 90%)'
        }
    }));


    return (
        <Paper elevation={15} style={{
            padding: '20px',
            marginTop: '10px',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '15px',
        }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8} style={{ position: 'relative' }}>
                    <Tooltip title={isFavorite(city.Key) ? "Remove from Favorites" : "Add to Favorites"}>
                        <Box
                            position="absolute"
                            top={10}
                            right={10}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            onClick={toggleFavorite}
                            style={{
                                transition: 'transform 0.2s ease, color 0.3s ease',
                                cursor: 'pointer',
                                // zIndex: 2
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {isFavorite(city.Key) ?
                                <RiHeartFill fontSize="4rem" style={{ color: blue[500], transition: 'color 0.3s ease' }}
                                    onMouseOver={(e) => e.currentTarget.style.color = blue[700]}
                                    onMouseOut={(e) => e.currentTarget.style.color = blue[500]} /> :
                                <RiHeartAddLine fontSize="4rem" style={{ color: blue[500], transition: 'color 0.3s ease' }}
                                    onMouseOver={(e) => e.currentTarget.style.color = blue[700]}
                                    onMouseOut={(e) => e.currentTarget.style.color = blue[500]} />
                            }
                        </Box>
                    </Tooltip>

                    <div>
                        <Typography variant="h4" style={{ color: blue[800] }}>{city.LocalizedName}</Typography>
                        <Typography variant="h5" style={{ color: blue[600], display: 'flex', alignItems: 'center' }}>
                            {getTemperature(weatherData.currentWeather[0].Temperature.Imperial.Value)}
                            <CustomSwitch
                                checked={isCelsius}
                                onChange={toggleTemperatureScale}
                                color="primary"
                                inputProps={{ 'aria-label': 'Temperature unit switch' }}
                                icon={<span style={{ color: blue[800] }}>C</span>}
                                checkedIcon={<span style={{ color: blue[800] }}>F</span>}
                            />
                        </Typography>
                        <Typography variant="h5" style={{ color: grey[600] }}>{weatherData.currentWeather[0].WeatherText}</Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CurrentWeather;

