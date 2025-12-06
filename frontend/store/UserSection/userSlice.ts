import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./thunks/signup";
import { login } from "./thunks/login";
import { logout } from "./thunks/logout";
import { oauthLogin } from "./thunks/oauthLogin";
import { getUserData } from "./thunks/getUserData";

interface UserType {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  tasksCreated: number;
  tasksCompleted: number;
  workspaces: number;
  createdAt: string | null;
  updatedAt: string | null;
  loading: boolean;
  error?: string;
}

const initialState: UserType = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  tasksCreated: 0,
  tasksCompleted: 0,
  workspaces: 0,
  createdAt: null,
  updatedAt: null,
  loading: false,
  error: undefined,
};

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

    // Oauth
    builder
      .addCase(oauthLogin.pending, setPending)
      .addCase(oauthLogin.fulfilled, (state) =>
        setFulfilled(state, initialState)
      )
      .addCase(oauthLogin.rejected, (state, action) =>
        setRejected(state, action.payload as string)
      );

    // GetUserData
    builder
      .addCase(getUserData.pending, setPending)
      .addCase(getUserData.fulfilled, (state, action) =>
        setFulfilled(state, action.payload.userData)
      )
      .addCase(getUserData.rejected, (state, action) =>
        setRejected(state, action.payload as string)
      );
  },
});

export default userSlice.reducer;
