import React, { useState, useEffect } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import CurrentWeather from "../components/currentWeather/CurrentWeather";
import FourDayForecast from "../components/fourDayForecast/FourDayForecast";
import SportsActivities from "../components/sportsActivities/SportsActivities";
import {
  searchCity,
  getCurrentConditions,
  getFourDayForecast,
  getCurrentConditionsForSportsActivities,
} from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherForSelectedCity } from "../redux/slices/weatherSlice";
import { Container, Typography } from "@mui/material";

function MainScreen({ setSnackbarOpen, setSnackbarMessage, darkMode }) {
  const weatherData = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const [city, setCity] = useState(
    weatherData.currentWeather[0] ? weatherData.currentWeather[0] : null
  );
  const [isCelsius, setIsCelsius] = useState(true);
  const deafultCity = "Tel-Aviv";
  const runnigId = "1";
  const bicyclingId = "4";
  const golfId = "5";
  const tennisId = "6";
  const fishingId = "13";
  const skingId = "15";

  const iconContext = require.context("../images", false, /\.png$/);

  // Fetch initial weather data when component mounts or selected city changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let targetCity = city;
        if (!city) {
          targetCity = await searchCity(
            deafultCity,
            setSnackbarOpen,
            setSnackbarMessage
          );
          targetCity = targetCity[0];
          setCity(targetCity);
        }

        const conditions = await getCurrentConditions(
          targetCity.Key,
          setSnackbarOpen,
          setSnackbarMessage
        );
        const fourDayForecast = await getFourDayForecast(
          targetCity.Key,
          setSnackbarOpen,
          setSnackbarMessage
        );

        const SportsActivities = await fetchSportsData(targetCity.Key);

        const currCity = {
          LocalizedName: targetCity.LocalizedName,
          Key: targetCity.Key,
          WeatherText: conditions[0].WeatherText,
          TemperatureValue: conditions[0].Temperature.Imperial.Value,
          Forecast: fourDayForecast,
          WeatherIcon: conditions[0].WeatherIcon,
          SportsActivities: SportsActivities,
        };
        console.log({ currCity });
        dispatch(setWeatherForSelectedCity(currCity));
      } catch (error) {
        console.error(error);
        setSnackbarOpen(true);
        setSnackbarMessage("Unexpected error occurred.");
      }
    };

    fetchWeatherData();
  }, [city, dispatch]);

  const fetchSportsData = async (cityKey) => {
    const sports = {
      running: runnigId,
      tennis: tennisId,
      bicycling: bicyclingId,
      golf: golfId,
      fishing: fishingId,
      ski: skingId,
    };

    const sportsActivities = {};

    for (const [sport, sportId] of Object.entries(sports)) {
      sportsActivities[sport] = await getCurrentConditionsForSportsActivities(
        cityKey,
        sportId,
        setSnackbarOpen,
        setSnackbarMessage
      );
      sportsActivities[sport] = sportsActivities[sport][0];
    }

    return sportsActivities;
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = (5 / 9) * (fahrenheit - 32);
    const formattedNum = parseFloat(celsius.toFixed(0));
    return formattedNum;
  };

  const getTemperature = (value) => {
    return isCelsius ? `${fahrenheitToCelsius(value)}°C` : `${value}°F`;
  };

  const getIcon = (iconNumber) => {
    try {
      return iconContext(`./${iconNumber}.png`);
    } catch (error) {
      console.error(`Icon "${iconNumber}.png" not found.`);
      return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <SearchBar setCity={setCity} />
      {city &&
      weatherData.currentWeather &&
      weatherData.currentWeather.length > 0 &&
      weatherData.forecast ? (
        <>
          <CurrentWeather
            city={city}
            getTemperature={getTemperature}
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
            fahrenheitToCelsius={fahrenheitToCelsius}
            darkMode={darkMode}
            getIcon={getIcon}
          />
          <SportsActivities darkMode={darkMode} />
          <FourDayForecast
            getTemperature={getTemperature}
            getIcon={getIcon}
            darkMode={darkMode}
          />
        </>
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </Container>
  );
}

export default MainScreen;
