import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: [],
  forecast: {},
  sportsActivities: {},
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherForSelectedCity: (state, action) => {
      state.currentWeather = [
        {
          LocalizedName: action.payload.LocalizedName,
          Key: action.payload.Key,
          WeatherText: action.payload.WeatherText,
          Temperature: { Imperial: { Value: action.payload.TemperatureValue } },
          WeatherIcon: action.payload.WeatherIcon,
        },
      ];
      state.forecast = action.payload.Forecast;
      state.sportsActivities = action.payload.SportsActivities;
    },
  },
});

export const { setWeatherForSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer;
