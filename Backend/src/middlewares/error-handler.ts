import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors";
import { MongoServerError } from "mongodb";

const errorHandlerMiddleWare = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof CustomError) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({ message });
  }

  if (err instanceof MongoServerError && err.code == 11000) {
    return res.status(400).send({ message: "User Already Exists" });
  }
  return res.status(500).send({ message: "Something went wrong" });
};

export default errorHandlerMiddleWare;
