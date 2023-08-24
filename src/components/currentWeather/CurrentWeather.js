import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Box, Paper, Tooltip, Switch } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { RiHeartAddLine, RiHeartFill } from "react-icons/ri";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/favoritesSlice";

function CurrentWeather({
  city,
  getTemperature,
  isCelsius,
  setIsCelsius,
  fahrenheitToCelsius,
  darkMode,
  getIcon,
  isSmallScreen,
}) {
  const weatherData = useSelector((state) => state.weather);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const colorTexts = darkMode ? blue[100] : blue[950];

  const isFavorite = (cityID) => {
    return favorites.some((favorite) => favorite.data.id === cityID);
  };

  const toggleTemperatureScale = () => {
    setIsCelsius(!isCelsius);
  };

  const toggleFavorite = () => {
    const cityData = {
      currentWeather: weatherData.currentWeather[0],
      forecast: weatherData.forecast,
      data: {
        cityName: weatherData.currentWeather[0].LocalizedName,
        id: weatherData.currentWeather[0].Key,
        WeatherText: weatherData.currentWeather[0].WeatherText,
        TemperatureValue: fahrenheitToCelsius(
          weatherData.currentWeather[0].Temperature.Imperial.Value
        ),
        WeatherIcon: weatherData.currentWeather[0].WeatherIcon,
        SportsActivities: weatherData.sportsActivities,
      },
    };

    if (isFavorite(cityData.data.id)) {
      dispatch(removeFromFavorites(cityData));
    } else {
      dispatch(addToFavorites(cityData));
    }
  };

  const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 72,
    height: 45,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 4,
      "&.Mui-checked": {
        transform: "translateX(30px)",
      },
      "&.Mui-checked + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    margin: "5px 0 0 15px",
    "& .MuiSwitch-thumb": {
      width: 42,
      height: 42,
      backgroundColor: "white",
      boxShadow: theme.shadows[1],
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: blue[800],
      transition: "color 0.3s ease",
    },
    "& .MuiSwitch-track": {
      borderRadius: 20,
      height: 40,
      width: 60,
      backgroundColor: theme.palette.grey[300],
      backgroundImage: darkMode
        ? "linear-gradient(45deg, #001f3f 30%, #003366 90%)"
        : "linear-gradient(45deg, #3A8DFF 30%, #86B9FF 90%)",
    },
  }));

  return (
    <Paper
      elevation={15}
      style={{
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "transparent",
        borderRadius: "15px",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8} style={{ position: "relative" }}>
          <Tooltip
            title={
              isFavorite(city.Key)
                ? "Remove from Favorites"
                : "Add to Favorites"
            }
          >
            <Box
              position="absolute"
              top={isSmallScreen ? 10 : 40}
              right={isSmallScreen ? 10 : -250}
              display="flex"
              flexDirection="column"
              alignItems="center"
              onClick={toggleFavorite}
              style={{
                transition: "transform 0.2s ease, color 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.08)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {isFavorite(city.Key) ? (
                <RiHeartFill
                  fontSize="4rem"
                  style={{
                    color: darkMode ? blue[300] : blue[800],
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = blue[1000])
                  }
                  onMouseOut={(e) => (e.currentTarget.style.color = blue[500])}
                />
              ) : (
                <RiHeartAddLine
                  fontSize="4rem"
                  style={{
                    color: darkMode ? blue[300] : blue[800],
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = blue[1000])
                  }
                  onMouseOut={(e) => (e.currentTarget.style.color = blue[500])}
                />
              )}
            </Box>
          </Tooltip>
          <div>
            <Typography
              variant="h6"
              style={{ marginBottom: "15px", color: colorTexts }}
            >
              Today
            </Typography>
            <Typography variant="h3" style={{ color: colorTexts }}>
              {city.LocalizedName}
            </Typography>
            <Typography
              variant="h5"
              style={{
                color: colorTexts,
                display: "flex",
                alignItems: "center",
              }}
            >
              Temperature:{" "}
              {getTemperature(
                weatherData.currentWeather[0].Temperature.Imperial.Value
              )}
              <CustomSwitch
                checked={isCelsius}
                onChange={toggleTemperatureScale}
                color="primary"
                inputProps={{ "aria-label": "Temperature unit switch" }}
                icon={
                  <span style={{ color: darkMode ? blue[150] : blue[800] }}>
                    C
                  </span>
                }
                checkedIcon={
                  <span style={{ color: darkMode ? blue[50] : blue[800] }}>
                    F
                  </span>
                }
              />
            </Typography>
            <Grid item xs={12} md={4} lg={4} style={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                style={{
                  color: colorTexts,
                  textAlign: "center",
                }}
              >
                {weatherData.currentWeather[0].WeatherText}
              </Typography>
            </Grid>
          </div>
          <Grid item xs={12} md={4} lg={4} style={{ textAlign: "center" }}>
            {getIcon(weatherData.currentWeather[0].WeatherIcon) && (
              <img
                src={getIcon(weatherData.currentWeather[0].WeatherIcon)}
                alt={`Weather condition for ${city.LocalizedName}`}
                style={{ width: "200px", height: "120px" }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CurrentWeather;
