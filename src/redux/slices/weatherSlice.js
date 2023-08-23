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

{
  /* <Grid item xs={12} md={4}>
                    {getIcon(city.WeatherIcon) && <img src={getIcon(city.WeatherIcon)} alt={`Selected ${userSelectedImageName}`} />}
                </Grid> */
}

{
  /* <Grid item xs={12} md={4}>
          {getIcon("1") && <img src={getIcon("1")} alt={`Selected 1`} />}
        </Grid> */
}

{
  /* <Grid item xs={12} md={4}>
          {getIcon(weatherData.currentWeather[0].WeatherIcon) && (
            <img
              src={getIcon(weatherData.currentWeather[0].WeatherIcon)}
              alt={`Selected ${weatherData.currentWeather[0].WeatherIcon}`}
            />
          )}
        </Grid> */
}
