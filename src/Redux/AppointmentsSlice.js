import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://book-doctors-appointment.onrender.com/api/v1/users/';

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async (id) => {
  const { userId } = id;
  const response = await axios.get(`${BASE_URL}${userId}/appointments`);
  return response.data;
});

const appointmentsReducer = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    fulfilled: false,
    hasErrors: false,
  },
  reducers: {},
  extraReducers: {
    [fetchAppointments.pending]: (state) => {
      state.loading = true;
    },
    [fetchAppointments.fulfilled]: (state, { payload }) => {
      state.appointments = payload;
      state.loading = false;
      state.hasErrors = false;
      state.fulfilled = true;
    },
    [fetchAppointments.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const selectAppointments = (state) => state.appointments.appointments;

export default appointmentsReducer.reducer;
