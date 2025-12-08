import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType } from "@/types/UserType";
import { PasswordSchemaType } from "@/features/taskero/profile/schemas/passwordSchema";

export const updateUser = createAsyncThunk(
  "user/update-user",
  async (data: Partial<PasswordSchemaType> & UserType, thunkAPI) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/`,
        data,
        { withCredentials: true, params: { id: data._id } }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "An error occurred while logging in"
      );
    }
  }
);
