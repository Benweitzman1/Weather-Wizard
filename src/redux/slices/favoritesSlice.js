import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const doesExist = state.some(fav => fav.data.id === action.payload.data.id);
      if (!doesExist) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      return state.filter(fav => fav.data.id !== action.payload.data.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
