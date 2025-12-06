import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user-data`,
        { withCredentials: true, params: { id } }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message ||
          "An error occurred while retrieving user data."
      );
    }
  }
);
