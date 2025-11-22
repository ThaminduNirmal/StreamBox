import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  items: [],
  currentUserId: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const movie = action.payload;
      const exists = state.items.find(item => item.id === movie.id);
      if (!exists) {
        state.items.push(movie);
      }
    },
    removeFromFavorites: (state, action) => {
      const movieId = action.payload;
      state.items = state.items.filter(item => item.id !== movieId);
    },
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === movie.id);
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(movie);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      state.currentUserId = null;
    },
    setFavorites: (state, action) => {
      state.items = action.payload.items;
      state.currentUserId = action.payload.userId;
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite, clearFavorites, setFavorites, setCurrentUserId } = favoritesSlice.actions;

export const saveFavoritesToStorage = (userId, favorites) => async () => {
  try {
    const key = `FAVORITES_USER_${userId}`;
    await AsyncStorage.setItem(key, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const loadFavoritesFromStorage = (userId) => async (dispatch) => {
  try {
    const key = `FAVORITES_USER_${userId}`;
    const stored = await AsyncStorage.getItem(key);
    if (stored) {
      const favorites = JSON.parse(stored);
      dispatch(setFavorites({ items: favorites, userId }));
    } else {
      dispatch(setFavorites({ items: [], userId }));
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
    dispatch(setFavorites({ items: [], userId }));
  }
};

export const selectFavorites = (state) => state.favorites.items;

export const selectIsFavorite = (movieId) => (state) => {
  return state.favorites.items.some(item => item.id === movieId);
};

export default favoritesSlice.reducer;

