import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (error: any) {
    thunkAPI.rejectWithValue(
      error.response.data.message || "Failed to log out"
    );
  }
});
