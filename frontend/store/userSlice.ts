import { createSlice } from "@reduxjs/toolkit";

interface UserType {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin" | "member";
}

const initialState: UserType = {
  id: "",
  name: "",
  email: "",
  avatar: "",
  role: "user",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (_, action: { payload: UserType }) => {
      return action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
