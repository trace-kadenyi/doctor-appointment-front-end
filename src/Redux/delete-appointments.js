import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const REMOVE_APPOINTMENT = 'appointments/REMOVE_APPOINTMENT';
const initialState = [];

// const deleteAppointment = createAsyncThunk(
//   REMOVE_APPOINTMENT,
//   async (data) => {
//     await fetch('http://localhost:3000/api/v1/appointments/{appointment_id}', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: data.token,
//       },
//     });
//   },
// );

const deleteAppointmentSlice = createSlice({
  name: 'removeAppointment',
  initialState,
  reducers: {
    deleteAppointment: (state) => state,
  },
});

export default deleteAppointmentSlice.reducer;
