import { NotificationType } from "@/features/taskero/notifications/types/NotificationType";
import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "./thunks/getNotifications";

type StateType = {
  loading: boolean;
  error: string | undefined;
  notifications: NotificationType[];
};

const initialState: StateType = {
  loading: false,
  error: undefined,
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default notificationSlice.reducer;
