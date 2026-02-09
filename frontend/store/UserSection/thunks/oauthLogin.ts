import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const oauthLogin = createAsyncThunk(
  "user/oauth-login",
  async (data: unknown, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/oauth-signin`,
        data,
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.message || "An error occurred while logging in",
        );
      }
      return thunkAPI.rejectWithValue("Unexpected error occurred");
    }
  },
);
