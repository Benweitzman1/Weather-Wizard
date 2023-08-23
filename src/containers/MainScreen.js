import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar/SearchBar';
import CurrentWeather from '../components/currentWeather/CurrentWeather';
import FiveDayForecast from '../components/fiveDayForecast/FiveDayForecast';
import { searchCity, getCurrentConditions, get5DayForecast } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherForSelectedCity } from '../redux/slices/weatherSlice';
import { Container, Typography } from '@mui/material';

function MainScreen({ setSnackbarOpen, setSnackbarMessage }) {
  const weatherData = useSelector(state => state.weather);
  const dispatch = useDispatch();
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

  const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = 5 / 9 * (fahrenheit - 32);
    const formattedNum = parseFloat(celsius.toFixed(0));
    return formattedNum;
  }

  const getTemperature = (value) => {
    return isCelsius ? `${fahrenheitToCelsius(value)}°C` : `${value}°F`;
  };

  return (
    <Container maxWidth="lg">
      <SearchBar setCity={setCity}/>
      {city && weatherData.currentWeather && weatherData.currentWeather.length > 0 && weatherData.forecast ? (
        <>
          <CurrentWeather
            city={city}
            getTemperature={getTemperature}
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
            fahrenheitToCelsius={fahrenheitToCelsius}
          />
          <FiveDayForecast
            getTemperature={getTemperature}
          />
        </>
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </Container>
);
}

export default MainScreen;
