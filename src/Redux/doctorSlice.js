import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/doctors';
const ADD_DOCTOR = 'http//localhost:3000/api/v1/users/:id/doctors';

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addDoctor = createAsyncThunk('doctors/addDoctor', async (doctor) => {
  const response = await axios.post(ADD_DOCTOR, doctor);
  return response.data;
});

const doctorReducer = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    loading: false,
    hasErrors: false,
  },
  reducers: {
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
    },
  },
  extraReducers: {
    [fetchDoctors.pending]: (state) => {
      state.loading = true;
    },
    [fetchDoctors.fulfilled]: (state, { payload }) => {
      state.doctors = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchDoctors.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const doctorSelector = (state) => state.doctor;

export default doctorReducer.reducer;
