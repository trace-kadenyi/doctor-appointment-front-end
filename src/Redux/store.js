import { configureStore } from '@reduxjs/toolkit';
import doctorSlice from '../Redux/doctorSlice';

const rootReducer = {
  doctors: doctorSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
