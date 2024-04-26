import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/Hotel";
import { Types } from "mongoose";
import { StatusCodes } from "http-status-codes";

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
  newHotel.userId = req.userId as Types.ObjectId;

  const hotel = new Hotel(newHotel);

  await hotel.save();

  res.status(StatusCodes.CREATED).json({ data: hotel });
};