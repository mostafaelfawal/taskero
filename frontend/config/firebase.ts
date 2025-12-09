import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAZpQIH7sycXvImnBpDVAJPF1gdTHPN30Q",
  authDomain: "taskero-64b9f.firebaseapp.com",
  projectId: "taskero-64b9f",
  storageBucket: "taskero-64b9f.firebasestorage.app",
  messagingSenderId: "26404441900",
  appId: "1:26404441900:web:d2ca5c2b9c8672586fe689",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
