import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { validationResult, Result } from "express-validator";
import BadRequestError from "../errors/bad-request";
import { StatusCodes } from "http-status-codes";

export const register = async (req: Request, res: Response) => {
  const validationerror: Result = validationResult(req);
  if (!validationerror.isEmpty()) {
    throw new BadRequestError({ message: "Fields cannot be empty" });
  }

  let user = await User.create(req.body);

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

  res.status(StatusCodes.CREATED).json({ message: "User created Sucessfully" });
};
