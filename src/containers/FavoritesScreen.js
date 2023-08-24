import React from "react";
import FavoritesList from "../components/favoritesList/FavoritesList";
import { setWeatherForSelectedCity } from "../redux/slices/weatherSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const FavoritesScreen = ({ favoriteCities }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectedCity = (selectedCity) => {
    console.log({ selectedCity });
    const currCity = {
      LocalizedName: selectedCity.currentWeather.LocalizedName,
      Key: selectedCity.currentWeather.Key,
      WeatherText: selectedCity.currentWeather.WeatherText,
      TemperatureValue: selectedCity.currentWeather.Temperature,
      Forecast: selectedCity.forecast,
      WeatherIcon: selectedCity.currentWeather.WeatherIcon,
      SportsActivities: selectedCity.SportsActivities,
    };
    console.log({ currCity });
    dispatch(setWeatherForSelectedCity(currCity));
    navigate("/");
  };

  console.log({ favoriteCities });
  return (
    <div
      className="favorites-screen"
      style={{ marginBottom: "10px", marginRight: "10px" }}
    >
      <FavoritesList
        favoriteCities={favoriteCities}
        onSelectCity={handleSelectedCity}
      />
    </div>
  );
};

export default FavoritesScreen;
