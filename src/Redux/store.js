import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserReducer';
import doctorReducer from './doctorSlice';;
import appointmentsReducer from './AppointmentsSlice';

const store = configureStore({
  reducer: {
    user: UserReducer,
    doctor: doctorReducer,
    appointments: appointmentsReducer,
  },
});

export default store;
