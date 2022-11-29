import { configureStore, combineReducers } from '@reduxjs/toolkit';
import doctorReducer from './doctorSlice';

const rootReducer = combineReducers({
  doctor: doctorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
