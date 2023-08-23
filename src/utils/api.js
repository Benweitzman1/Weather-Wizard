import axios from "axios";

const API_KEY = "C6JUnDwjWHtffQhjZ3Q8cqN6vUDFPKJv";
const BASE_URL = "https://dataservice.accuweather.com";

export const searchCity = async (
  query,
  setSnackbarOpen,
  setSnackbarMessage
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`
    );
    if (response.data && response.data.length > 0) {
      return response.data;
    } else return null;
  } catch (error) {
    setSnackbarOpen(true);
    setSnackbarMessage(
      "There was an error communicating with the weather service"
    );
  }
};

export const getCurrentConditions = async (
  locationKey,
  setSnackbarOpen,
  setSnackbarMessage
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    setSnackbarOpen(true);
    setSnackbarMessage(
      "There was an error communicating with the weather service"
    );
  }
};

export const get5DayForecast = async (
  locationKey,
  setSnackbarOpen,
  setSnackbarMessage
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    setSnackbarOpen(true);
    setSnackbarMessage(
      "There was an error communicating with the weather service"
    );
  }
};

export const getCurrentConditionsForSportsActivity = async (
  locationKey,
  sportId,
  setSnackbarOpen,
  setSnackbarMessage
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/indices/v1/daily/1day/${locationKey}/${sportId}?apikey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    setSnackbarOpen(true);
    setSnackbarMessage(
      "There was an error communicating with the weather service"
    );
  }
};
