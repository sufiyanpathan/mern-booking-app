import express from "express";
import { check } from "express-validator";
import { verifyToken } from "../middleware/auth";
import { login, logout, validateToken } from "../controllers/auth.controllers";

const authRouter = express.Router();

authRouter.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  login
);

authRouter.get("/validate-token", verifyToken, validateToken);

authRouter.post("/logout", logout);

export default authRouter;
