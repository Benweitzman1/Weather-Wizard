import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentWeather: [],
  forecast: {},
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherForSelectedCity: (state, action) => {
      state.currentWeather = [{
        LocalizedName: action.payload.LocalizedName,
        Key: action.payload.Key,
        WeatherText: action.payload.WeatherText,
        Temperature: { Imperial: { Value: action.payload.TemperatureValue }}
      }];
      state.forecast = action.payload.Forecast;
    },
  },
});

export const { setWeatherForSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer;
