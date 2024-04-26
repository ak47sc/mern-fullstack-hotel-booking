import express from "express";
import { register } from "../controller/users";
import { body } from "express-validator";
const router = express.Router();

const validator = [
  body("firstname", "Firstname is required").isString(),
  body("lastname", "Lastname is required").isString(),
  body("email", "Email is required").isEmail(),
  body("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

router.route("/register").post(validator, register);

export default router;
