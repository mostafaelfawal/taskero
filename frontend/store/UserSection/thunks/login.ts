import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthSchemaType } from "../schemas/authSchema";
import axios from "axios";

export const login = createAsyncThunk(
  "user/login",
  async (data: AuthSchemaType, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "An error occurred while logging in"
      );
    }
  }
);
