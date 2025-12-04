import { AuthSchemaType } from "@/store/UserSection/schemas/authSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "user/signup",
  async (data: AuthSchemaType, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        data,
        { withCredentials: true }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "The account has not been created"
      );
    }
  }
);
