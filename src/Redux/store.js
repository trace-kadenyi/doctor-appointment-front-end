import { configureStore, combineReducers } from '@reduxjs/toolkit';
import doctorSlice from './doctorSlice';

const rootReducer = combineReducers({
  doctor: doctorSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
