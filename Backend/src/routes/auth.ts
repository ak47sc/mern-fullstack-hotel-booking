import express from "express";
import { login, logout, validateToken } from "../controller/auth";
import { check } from "express-validator";
import { verifyToken } from "../middlewares/auth";
const router = express.Router();

const validator = [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

router.route("/login").post(validator, login);
router.route("/validate-token").get(verifyToken, validateToken);
router.route("/logout").post(logout);

export default router;
