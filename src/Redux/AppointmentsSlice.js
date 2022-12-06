import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const notify = (e) => toast(e);


const BASE_URL = 'https://book-doctors-appointment.onrender.com/api/v1/users/';

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async (id) => {
  const { userId } = id;
  const response = await axios.get(`${BASE_URL}${userId}/appointments`);
  return response.data;
});

// add appointments
export const addAppointment = createAsyncThunk('appointments/addAppointment', async (appointment) => {
  const { userId, doctorId, date_of_appointment, time_of_appointment } = appointment;
  const response = await axios.post(`${BASE_URL}${userId}/appointments`, {
    doctor_id: doctorId,
    date_of_appointment,
    time_of_appointment,
  });
  return response.data;
});

const appointmentsReducer = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    fulfilled: false,
    hasErrors: false,
    appointmentEdited: false,
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
    [addAppointment.pending]: (state) => {
      state.loading = true;
    },
    [addAppointment.fulfilled]: (state, { payload }) => {
      state.appointments.push(payload);
      state.loading = false;
      state.hasErrors = false;
      state.appointmentEdited = true;
      notify('Appointment added successfully');
    },
    [addAppointment.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  }
});

export const selectAppointments = (state) => state.appointments.appointments;

export default appointmentsReducer.reducer;
