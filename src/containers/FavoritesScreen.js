import React from "react";
import FavoritesList from "../components/favoritesList/FavoritesList";
import { setWeatherForSelectedCity } from "../redux/slices/weatherSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const FavoritesScreen = ({ favoriteCities }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectedCity = (selectedCity) => {
    const currCity = {
      LocalizedName: selectedCity.currentWeather.LocalizedName,
      Key: selectedCity.currentWeather.Key,
      WeatherText: selectedCity.currentWeather.WeatherText,
      TemperatureValue: selectedCity.currentWeather.Temperature,
      Forecast: selectedCity.forecast,
      WeatherIcon: selectedCity.currentWeather.WeatherIcon,
      SportsActivities: selectedCity.SportsActivities,
    };
    dispatch(setWeatherForSelectedCity(currCity));
    navigate("/");
  };

  return (
    <div className="favorites-screen">
      <FavoritesList
        favoriteCities={favoriteCities}
        onSelectCity={handleSelectedCity}
      />
    </div>
  );
};

export default FavoritesScreen;
