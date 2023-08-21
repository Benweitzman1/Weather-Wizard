import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import weatherReducer from './slices/weatherSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    weather: weatherReducer
  },
});