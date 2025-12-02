import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db";

const app = express();
const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () =>
  console.log(`the server is run http://localhost:${PORT}`)
);
