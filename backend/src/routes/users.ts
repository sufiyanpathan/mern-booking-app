import express, { Request, Response } from "express";
import { registerUser } from "../controllers/user.controllers";
import { check } from "express-validator";

const userRouter = express.Router();

// /api/users/register
userRouter.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with s6 or more characters required").isLength({
      min: 6,
    }),
  ],
  registerUser
);

export default userRouter;
