import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/songSlice';
import themeReducer from './features/themeSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    songs: songReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

export default store;