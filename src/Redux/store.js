
import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserReducer';
import doctorReducer from './doctorSlice'

const store = configureStore({
  reducer: {
    user: UserReducer,
     doctor: doctorReducer,
  },
});

export default store;