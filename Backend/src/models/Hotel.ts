import mongoose from "mongoose";
import user from "./user";

export type HotelType = {
  _id: string;
  userId: mongoose.Types.ObjectId;
  name: string;
  city: string;
  country: string;
  description: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
};
const hotelSchema = new mongoose.Schema<HotelType>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
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
