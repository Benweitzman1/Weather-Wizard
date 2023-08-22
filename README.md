# Weather Wizard: Your Daily Forecast Companion

**Weather Wizard** is a seamless and intuitive weather application designed to provide accurate, up-to-date weather information for any city worldwide. Built with React and leveraging modern weather APIs, our application aims to provide users with a clear understanding of the current weather conditions, as well as a 5-day forecast.

🚀 **Live Application**: [Weather Wizard](https://benweitzman1.github.io/ben-weitzman-17-08-2023/)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Structure](#structure)
- [API Configuration](#api-configuration)
- [API Calls](#api-calls)

## Features

- Search for a city to view its current weather conditions.
- See a 5-day forecast for a city.
- Add and remove cities from the favorites list.
- Toggle between light and dark mode for better visibility at any time of day.
- Switch between Celsius and Fahrenheit temperature scales.
- Redux state management for application data.
- Routes managed with React Router.
- Utilizes Material-UI (MUI) for a polished and responsive user interface.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Benweitzman1/Weather-Wizard.git
   ```
2. Change into the project directory:
   ```
   cd Weather-Wizard
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

Your app should now be running on http://localhost:3000.

## Dependencies

- React
- Redux and @reduxjs/toolkit
- Axios
- React Router
- Material-UI (MUI)

## Structure

Here's a brief outline of the main components and modules:

- App: The main application wrapper.
- Header: The navigation header with links to home and favorites.
- MainScreen: Displays the search bar, current weather conditions, and a 5-day forecast.
- FavoritesScreen: Displays a list of favorite cities and their current conditions.
- SearchBar: Lets users search for cities.
- FavoritesList: Renders the list of favorite cities.
- api: Contains API calls to retrieve weather data.

  Redux slices:

- favoritesSlice: Manages the state for favorite cities.
- weatherSlice: Manages the state for the weather data of the selected city.

## API Configuration

To make API calls, the application uses the following base URL and API key:

- **BASE_URL**: http://dataservice.accuweather.com
- **API_KEY**: C6JUnDwjWHtffQhjZ3Q8cqN6vUDFPKJv

## API Calls

The application makes use of three primary API calls to fetch data:

1. **Search City**

   - **Endpoint**: `/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`
   - **Method**: `GET`
   - **Purpose**: This API call retrieves a list of cities based on the search query, providing city details such as localized name, country, administrative area, and a unique key for further weather data retrieval.

2. **Current Weather**

   - **Endpoint**: `/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
   - **Method**: `GET`
   - **Purpose**: Utilizes the unique id of a city to fetch its current weather conditions. This includes the local observation time, a brief description of the current weather, the weather icon, temperature in both metric and imperial units, and associated links for more detailed weather information.

3. **5-day Forecast**
   - **Endpoint**: `/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`
   - **Method**: `GET`
   - **Purpose**: Utilizes the unique id of a city to fetch its 5-day weather forecast. The forecast provides daily details like expected high and low temperatures, a general description of the day's weather conditions, and associated links for a detailed forecast.

import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import { searchCity, getCurrentConditions, get5DayForecast } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/slices/favoritesSlice';
import { setWeatherForSelectedCity } from '../redux/slices/weatherSlice';
import { Container, Typography, Button, Divider, Paper, Grid, Box } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '@mui/material/styles';

function MainScreen({ setSnackbarOpen, setSnackbarMessage }) {
const weatherData = useSelector(state => state.weather);
const dispatch = useDispatch();
const favorites = useSelector(state => state.favorites);
const theme = useTheme();
const [city, setCity] = useState(weatherData.currentWeather[0] ? weatherData.currentWeather[0] : null);
const [isCelsius, setIsCelsius] = useState(true);
const deafultCity = "Tel-Aviv"

// Fetch initial weather data when component mounts or selected city changes
useEffect(() => {
const fetchWeatherData = async () => {
try {
let targetCity = city;
if (!city) {
targetCity = await searchCity(deafultCity, setSnackbarOpen, setSnackbarMessage);
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
const celsius = 5 / 9 \* (fahrenheit - 32);
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

  <!-- return (
    <Container maxWidth="lg">
      <SearchBar setCity={setCity} />
      {/* Render weather details if available; otherwise, show loading */}
      {city && weatherData.currentWeather && weatherData.currentWeather.length > 0 && weatherData.forecast ? (
        <Paper elevation={15} style={{ padding: '20px', marginTop: '40px', backgroundColor: theme.palette.background.paper }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8} style={{ display: 'flex', alignItems: 'center', marginBottom: '65px' }}>
              <div>
                <Typography variant="h4" style={{ color: blue[800] }}>{city.LocalizedName}</Typography>
                <Typography variant="h5" style={{ color: blue[600] }}>{getTemperature(weatherData.currentWeather[0].Temperature.Imperial.Value)}</Typography>
                <Typography variant="h5" style={{ color: grey[600] }}>{weatherData.currentWeather[0].WeatherText}</Typography>
              </div>
              <Box display="flex" flexDirection="column" alignItems="center" ml={3}>
                {isFavorite(city.Key) ? 
                  <FavoriteIcon fontSize="large" style={{ color: blue[500] }} /> : 
                  <FavoriteBorderIcon fontSize="large" style={{ color: blue[500] }} />
                }
                <Typography 
                  variant="caption" 
                  style={{ 
                    color: isFavorite(city.Key) ? grey[700] : 'transparent',
                    minHeight: '1rem'  // Ensure it takes up space even if transparent
                  }}>
                  In Favorites
                </Typography>
              </Box>
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
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => toggleFavorite(city.LocalizedName)}
                  style={{ 
                    textTransform: 'none', 
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {isFavorite(city.Key) ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </div>
            </Grid>
          </Grid>
          <Divider style={{ margin: '20px 0' }} />
          <Grid container spacing={0} justifyContent="space-between">
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
 -->