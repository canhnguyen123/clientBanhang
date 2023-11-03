import { configureStore } from '@reduxjs/toolkit';
import theloaiReducer from './theloaiSlice';
export const store = configureStore({
  reducer: {

    theloai: theloaiReducer,
  },
});
