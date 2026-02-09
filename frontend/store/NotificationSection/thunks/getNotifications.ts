import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotifications = createAsyncThunk(
  "notifications/notificationsData",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications`,
        { withCredentials: true },
      );

      return res.data.notifications;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.message ||
            "An error occurred while retrieving notifications",
        );
      }
      return thunkAPI.rejectWithValue("Unexpected error occurred");
    }
  },
);
