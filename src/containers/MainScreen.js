import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import { searchCity, getCurrentConditions, get5DayForecast } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/slices/favoritesSlice';
import { setWeatherForSelectedCity } from '../redux/slices/weatherSlice';
import { Container, Typography, Button, Divider, Paper, Grid, Box } from '@mui/material';

function MainScreen({ setSnackbarOpen, setSnackbarMessage }) {
  const weatherData = useSelector(state => state.weather);
  const [city, setCity] = useState(weatherData.currentWeather[0] ? weatherData.currentWeather[0] : null);
  const [isCelsius, setIsCelsius] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  // Fetch initial weather data when component mounts or selected city changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let targetCity = city;
          if (!city) {
            targetCity = await searchCity("tel-aviv", setSnackbarOpen, setSnackbarMessage);
            targetCity = targetCity[0];
            setCity(targetCity);
          }

        const conditions = await getCurrentConditions(targetCity.Key, setSnackbarOpen, setSnackbarMessage);
        const fiveDayForecast = await get5DayForecast(targetCity.Key, setSnackbarOpen, setSnackbarMessage);
       
        const currCity = {
          LocalizedName: targetCity.LocalizedName,
          Key: targetCity.Key,
          WeatherText: conditions[0].WeatherText,
          TemperatureValue: conditions[0].Temperature.Imperial.Value,
          Forecast: fiveDayForecast,
        }
        dispatch(setWeatherForSelectedCity(currCity));
      } catch (error) {
        console.error(error);
        setSnackbarOpen(true);
        setSnackbarMessage("Unexpected error occurred.");
      }
    };

    fetchWeatherData();
  }, [city, dispatch]);

  const getDayOfWeek = (dateString) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = 5 / 9 * (fahrenheit - 32);
    const formattedNum = parseFloat(celsius.toFixed(1));
    return formattedNum;
  }

  const toggleTemperatureScale = () => {
    setIsCelsius(!isCelsius);
  };

  const getTemperature = (value) => {
    return isCelsius ? `${fahrenheitToCelsius(value)}°C` : `${value}°F`;
  };

  const isFavorite = (cityID) => {
    return favorites.some(favorite => favorite.data.id === cityID);
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
    <Container>
      <SearchBar setCity={setCity} />
      {/* Render weather details if available; otherwise, show loading */}
      {city && weatherData.currentWeather && weatherData.currentWeather.length > 0 && weatherData.forecast ? (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '40px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <Typography variant="h4">{city.LocalizedName}</Typography>
              <Typography variant="h5">{getTemperature(weatherData.currentWeather[0].Temperature.Imperial.Value)}</Typography>
              <Typography variant="h5" style={{ textAlign: 'center', margin: '20px 0' }}>
                {weatherData.currentWeather[0].WeatherText}
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
                <Button
                  onClick={toggleTemperatureScale}
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: '10px', minWidth: '180px', textTransform: 'none' }}
                >
                  Toggle to {isCelsius ? "Fahrenheit" : "Celsius"}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleFavorite(city.LocalizedName)}
                  style={{ minWidth: '190px', textTransform: 'none' }}
                >
                  {isFavorite(city.Key) ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </div>
              <Box height="40px" display="flex" alignItems="center">
                {isFavorite(city.Key) && <Typography variant="h2" style={{ marginBottom: '50px', marginRight: '55px' }}>🌟</Typography>}
              </Box>
            </Grid>
          </Grid>
          <Divider style={{ margin: '20px 0' }} />
          <Grid container spacing={3} justifyContent="space-between">
            {weatherData.forecast.DailyForecasts.map((day, index) => (
              <Grid item xs key={index} style={{ textAlign: 'center', border: '1px solid black', padding: '10px', margin: '0 5px' }}>
                <Typography variant="body1">{index === 0 ? 'Today' : getDayOfWeek(day.Date)}</Typography>
                <Typography variant="body1">{getTemperature(day.Temperature.Maximum.Value)}</Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
  </Container>
  );
}

export default MainScreen;

