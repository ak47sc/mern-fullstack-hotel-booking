import mongoose from "mongoose";

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
  type: string;
};
