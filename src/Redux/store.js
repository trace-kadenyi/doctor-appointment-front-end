import { configureStore, combineReducers } from '@reduxjs/toolkit';
import doctorReducer from './doctorSlice';

const rootReducer = combineReducers({
  doctor: doctorReducer,
  doctor_show: doctorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
