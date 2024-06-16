import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { validationResult } from "express-validator";

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res.status(200).send({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};
