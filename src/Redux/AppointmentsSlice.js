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
  const { userId } = appointment;
  const response = await axios.post(`${BASE_URL}${userId}/appointments`, appointment);
  return response.data;
});

export const deleteAppointment = createAsyncThunk('appointments/deleteAppointment', async (ids) => {
  const { userId, doctorId } = ids;
  await axios.delete(`${BASE_USERS_URL}${userId}/appointments/${doctorId}`);
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
      notify('Appointment added successfully!');
    },
    [addAppointment.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
      notify('Error while booking appointment!');
    },
    [deleteAppointment.fulfilled]: (state, { payload }) => {
      state.appointments.push(payload);
      state.loading = false;
      state.hasErrors = false;
      state.appointmentEdited = true;
      notify('Appointment deleted successfully!');
    },
    [deleteAppointment.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
      notify('Error while deleting appointment!');
    },
  },
});

export const selectAppointments = (state) => state.appointments.appointments;
export const selectAppointmentsLoading = (state) => state.appointments.loading;
export const selectApppointmentsFulfilled = (state) => state.appointments.fulfilled;
export const selectApppointmentsRejected = (state) => state.appointments.hasErrors;

export default appointmentsReducer.reducer;
