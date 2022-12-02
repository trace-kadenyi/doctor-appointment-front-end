import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/doctors';

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});
export const fetchDoctor = createAsyncThunk('doctors/fetchDoctor', async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
});

const doctorReducer = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    doctor: {},
    loading: false,
    hasErrors: false,
  },
  reducers: {
    deleteDoctor: (state, action) => {
      const doctorId = action.payload;
      state.doctors = state.doctors.filter((doctor) => doctor.id !== doctorId);
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
  },
});

export const doctorSelector = (state) => state.doctor;
export const { deleteDoctor } = doctorReducer.actions;
export default doctorReducer.reducer;
