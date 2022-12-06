import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const notify = (e) => toast(e);

const BASE_URL = 'https://book-doctors-appointment.onrender.com/api/v1/doctors/';

const BASE_USERS_URL = 'https://book-doctors-appointment.onrender.com/api/v1/users/';

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});
export const fetchDoctor = createAsyncThunk('doctors/fetchDoctor', async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
});

export const deleteDoctor = createAsyncThunk('doctors/deleteDoctor', async (ids) => {
  const { userId, doctorId } = ids;
  await axios.delete(`${BASE_USERS_URL}${userId}/doctors/${doctorId}`);
});

// add doctor
export const addDoctor = createAsyncThunk('doctors/addDoctor', async (doctor) => {
  const { userId } = doctor;
  const ADD_DOCTOR = `${BASE_USERS_URL}${userId}/doctors`;
  const response = await axios.post(ADD_DOCTOR, doctor);
  return response.data;
});

const doctorReducer = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    doctor: {},
    loading: false,
    fulfilled: false,
    hasErrors: false,
    doctorEdited: false,
  },
  reducers: {},
  extraReducers: {
    [fetchDoctors.pending]: (state) => {
      state.loading = true;
    },
    [fetchDoctors.fulfilled]: (state, { payload }) => {
      state.doctors = payload;
      state.loading = false;
      state.fulfilled = true;
      state.hasErrors = false;
    },
    [fetchDoctors.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    [fetchDoctor.pending]: (state) => {
      state.loading = true;
    },
    [fetchDoctor.fulfilled]: (state, { payload }) => {
      state.doctor = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchDoctor.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    [deleteDoctor.pending]: (state) => {
      state.loading = true;
    },
    [deleteDoctor.fulfilled]: (state, { payload }) => {
      state.doctor = payload;
      state.loading = false;
      state.hasErrors = false;
      state.doctorEdited = !state.doctorEdited;
      notify('doctor deleted!');
    },
    [deleteDoctor.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    [addDoctor.pending]: (state) => {
      state.loading = true;
    },
    [addDoctor.fulfilled]: (state, { payload }) => {
      state.doctor = payload;
      state.loading = false;
      state.hasErrors = false;
      state.fulfilled = true;
      state.doctorEdited = !state.doctorEdited;
      notify('doctor Added!');
    },
    [addDoctor.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const doctorSelector = (state) => state.doctor;
export const selectdoctorEdited = (state) => state.doctor.doctorEdited;
export const selectDoctors = (state) => state.doctor.doctors;
export const selectDoctorsloading = (state) => state.loading;
export const selectDoctor = (state) => state.doctor.doctor;
export const selectDoctorsFulfilled = (state) => state.doctor.fulfilled;

export default doctorReducer.reducer;
