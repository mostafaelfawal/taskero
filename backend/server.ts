import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth.routes";
import auth from "./middlewares/auth.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.get("/api/taskero", auth);

connectDB();

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
