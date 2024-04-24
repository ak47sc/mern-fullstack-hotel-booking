import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import BadRequestError from "../errors/bad-request";
import User from "../models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const login = async (req: Request, res: Response) => {
  const validationErrors: Result = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new BadRequestError({
      message: "Fields cannot be empty",
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError({ message: "Invalid Credentials" });
  }

  const comparePassword = await bcryptjs.compare(password, user.password);
  if (!comparePassword) {
    throw new BadRequestError({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1d" }
  );

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  });

  res.status(StatusCodes.OK).json({ userId: user._id });
};

export const validateToken = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ userId: req.userId });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.status(StatusCodes.OK).json({ message: "Logout Success" });
};
