import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./thunks/signup";
import { login } from "./thunks/login";
import { logout } from "./thunks/logout";

interface UserType {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin" | "member";
  loading: boolean;
  error?: string;
}

const initialState: UserType = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  role: "user",
  loading: false,
  error: undefined,
};

// دوال مساعدة لتقليل التكرار
const setPending = (state: UserType) => {
  state.loading = true;
  state.error = undefined;
};

const setFulfilled = (state: UserType, userData: Partial<UserType>) => {
  state.loading = false;
  state.error = undefined;
  Object.assign(state, userData);
};

const setRejected = (state: UserType, error: string) => {
  state.loading = false;
  state.error = error;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, setPending)
      .addCase(signup.fulfilled, (state, action) =>
        setFulfilled(state, action.payload.userData)
      )
      .addCase(signup.rejected, (state, action) =>
        setRejected(state, action.payload as string)
      );

    // Login
    builder
      .addCase(login.pending, setPending)
      .addCase(login.fulfilled, (state, action) =>
        setFulfilled(state, action.payload.userData)
      )
      .addCase(login.rejected, (state, action) =>
        setRejected(state, action.payload as string)
      );

    // Logout
    builder
      .addCase(logout.pending, setPending)
      .addCase(logout.fulfilled, (state) => setFulfilled(state, initialState))
      .addCase(logout.rejected, (state, action) =>
        setRejected(state, action.payload as string)
      );
  },
});

export default userSlice.reducer;
