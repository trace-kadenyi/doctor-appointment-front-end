import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/doctors";

export const fetchDoctors = createAsyncThunk("doctors/fetchDoctors", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
}
);

export const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [fetchDoctors.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchDoctors.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.doctors = state.doctors.concat(action.payload);
    },
    [fetchDoctors.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});

export default doctorSlice.reducer;