import { configureStore } from '@reduxjs/toolkit';
//import { createStore, applyMiddleware, compose } from "redux";
//import thunk from 'redux-thunk';
import reducer from "../reducer/reducer";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // ya incluye redux-thunk por defecto
  devTools: true, // Habilita Redux DevTools automáticamente en desarrollo
});
