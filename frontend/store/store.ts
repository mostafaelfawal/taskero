import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./NotificationSection/notificationSlice";
import userReducer from "./UserSection/userSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
