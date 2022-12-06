import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = 'https://book-doctors-appointment.onrender.com/api/v1/';

const notify = (e) => toast(e);


export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async (id) => {
  const { userId } = id;
  const response = await axios.get(`${BASE_URL}users/${userId}/appointments`);
  return response.data;
});

// add appointments
export const addAppointment = createAsyncThunk('appointments/addAppointment', async (appointment) => {
  const { userId } = appointment;
  const response = await axios.post(`${BASE_URL}users/${userId}/appointments`, appointment);
  return response.data;
});

export const deleteAppointment = createAsyncThunk('appointments/deleteAppointment', async (data) => {
  const { appointmentId, userId } = data;
  await axios.delete(`${BASE_URL}users/${userId}/appointments/${appointmentId}`);
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
      state.appointmentEdited = !state.appointmentEdited;
      notify('Appointment added successfully!');
    },
    [addAppointment.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
      notify('Error while booking appointment!');
    },
    [deleteAppointment.pending]: (state) => {
      state.loading = true;
    },
    [deleteAppointment.fulfilled]: (state) => {
      state.loading = false;
      state.hasErrors = false;
      state.appointmentEdited = !state.appointmentEdited;
      notify('Appointment canceled successfully!');
    },
    [deleteAppointment.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
      notify('Error while canceling appointment!');
    },
  },
});

export const selectAppointments = (state) => state.appointments.appointments;
export const selectAppointmentsLoading = (state) => state.appointments.loading;
export const selectApppointmentsFulfilled = (state) => state.appointments.fulfilled;
export const selectApppointmentsRejected = (state) => state.appointments.hasErrors;
export const selectApppointmentsEdited = (state) => state.appointments.appointmentEdited;

export default appointmentsReducer.reducer;
