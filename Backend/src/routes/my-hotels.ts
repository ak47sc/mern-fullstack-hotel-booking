import express from "express";
import { addHotels, getAllHotels } from "../controller/my-hotels";
import multer from "multer";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const validators = [
  body("name", "name is required").isString(),
  body("city", "city is required").isString(),
  body("country", "country is required").isString(),
  body("description", "description is required").isString(),
  body("type", "type is required").isString(),
  body("pricePerNight")
    .notEmpty()
    .withMessage("pricePerNight is required")
    .isNumeric()
    .withMessage("pricePerNight should be a number"),
  body("facilities")
    .notEmpty()
    .withMessage("facilities is required")
    .isArray()
    .withMessage("facilities should be an array"),
];
router
  .route("/")
  .post(validators, upload.array("imageFiles", 6), addHotels)
  .get(getAllHotels);

export default router;
