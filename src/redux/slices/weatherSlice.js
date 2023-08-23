import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: [],
  forecast: {},
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
    },
  },
});

export const { setWeatherForSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer;

// i would like to do the 2-2-1 but you have an idea how i can take it to higher level? maybe to separte each square to separde component?
