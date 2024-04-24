import express from "express";
import { register } from "../controller/userController";
import { check } from "express-validator";
const router = express.Router();

const validator = [
  check("firstname", "Firstname is required").isString(),
  check("lastname", "Lastname is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

router.route("/register").post(validator, register);

export default router;
