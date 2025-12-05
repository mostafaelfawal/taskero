import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    },
    setTheme: (_, action) => action.payload,
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
