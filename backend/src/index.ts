import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() =>
    console.log(
      "Connected to the database: ",
      process.env.MONGODB_CONNECTION_STRING
    )
  );

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//host
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.listen(7000, () => {
  console.log("server is running on localhost:7000");
});
