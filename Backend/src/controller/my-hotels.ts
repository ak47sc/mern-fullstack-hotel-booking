import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel from "../models/Hotel";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { HotelType } from "../shared/types";

export const addHotels = async (req: Request, res: Response) => {
  const imagefiles = req.files as Express.Multer.File[];
  const newHotel: HotelType = req.body;

  const uploadPromises = imagefiles.map(async (image) => {
    const base64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + base64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  const imageUrls = await Promise.all(uploadPromises);

  newHotel.imageUrls = imageUrls;
  newHotel.userId = req.userId as unknown as string;

  const hotel = new Hotel(newHotel);

  await hotel.save();

  return res.status(StatusCodes.CREATED).json({ data: hotel });
};

export const getAllHotels = async (req: Request, res: Response) => {
  const hotels = await Hotel.find({
    userId: req.userId,
  });

  if (!hotels) {
    return res.status(StatusCodes.OK).json({ message: "No hotels found" });
  }
  return res.status(StatusCodes.OK).json(hotels);
};
