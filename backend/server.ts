import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import auth from "./middlewares/auth.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
// Routers
import authRouter from "./routes/auth.routes";
import workspaceRouter from "./routes/workspace.routes";
import invitationRouter from "./routes/invitation.routes";
import memberRouter from "./routes/member.routes";
import notificationsRouter from "./routes/notifications.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/workspace", auth, workspaceRouter);
app.use("/api/invitation", auth, invitationRouter);
app.use("/api/member", auth, memberRouter);
app.use("/api/notifications", auth, notificationsRouter);
connectDB();

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
