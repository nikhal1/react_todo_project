import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state of the users slice
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    return [...response.data.products];
  } catch (error) {
    console.error("API Fetch Error:", error); // Debug: Log the error
    return error.response?.data || error.message;
  }
});

// Create slice for user data
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...action.payload];
        state.error = "";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message; // Set the error message
      });
  },
});

// Export reducer
export default userSlice.reducer;
