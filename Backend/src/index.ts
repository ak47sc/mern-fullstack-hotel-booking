import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config.js";
import "express-async-errors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

import { connectDB } from "./db/connect";
import notFoundMiddleware from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";
import path from "path";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../../Frontend/dist")));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL as string);
    app.listen(PORT, () => {
      console.log(`Server Listening in port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
