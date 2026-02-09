import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk(
  "user/delete-user",
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete-account`,
        { withCredentials: true, params: { id } },
      );
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        thunkAPI.rejectWithValue(
          error.response?.data.message || "Failed to Delete Account",
        );
      }
      return thunkAPI.rejectWithValue("Unexpected error occurred");
    }
  },
);
