import mongoose from "mongoose";
import user from "./user";
import { HotelType } from "../shared/types";

const hotelSchema = new mongoose.Schema<HotelType>(
  {
    userId: {
      type: String,
      ref: user,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    facilities: [
      {
        type: String,
        required: true,
      },
    ],
    adultCount: {
      type: Number,
      required: true,
    },
    childCount: {
      type: Number,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    imageUrls: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<HotelType>("Hotels", hotelSchema);
