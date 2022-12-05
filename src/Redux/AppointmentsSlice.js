import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://book-doctors-appointment.onrender.com/api/v1/appointments';

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

const appointmentsReducer = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
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
    },
    [fetchAppointments.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const selectAppointments = (state) => state.appointments.appointments;

export default appointmentsReducer.reducer;
