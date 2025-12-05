"use client"

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

export default function ToastProvider() {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <ToastContainer
      position="bottom-right"
      draggable
      autoClose={3000}
      theme={theme}
      transition={Bounce}
    />
  );
}
