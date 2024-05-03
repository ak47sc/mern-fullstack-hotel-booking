import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel from "../models/Hotel";
import { StatusCodes } from "http-status-codes";
import { HotelType } from "../shared/types";

export const addHotels = async (req: Request, res: Response) => {
  const imagefiles = req.files as Express.Multer.File[];
  console.log(imagefiles);
  const newHotel: HotelType = req.body;

  const imageUrls = await uploadImagesToCloud(imagefiles);

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

export const getSingleHotel = async (req: Request, res: Response) => {
  const hotel = await Hotel.findOne({ _id: req.params.id, userId: req.userId });
  if (!hotel) {
    return res.status(StatusCodes.OK).json({ message: "No hotel found" });
  }
  return res.status(StatusCodes.OK).json(hotel);
};

export const updateHotel = async (req: Request, res: Response) => {
  const hotel = await Hotel.findOne({ _id: req.params.id, userId: req.userId });
  if (!hotel) {
    return res.status(StatusCodes.OK).json({ message: "No hotel found" });
  }

  hotel.imageUrls.forEach(async (url) => {
    const public_id = url.split("/").pop()?.split(".")[0];
    const res = await cloudinary.v2.uploader.destroy(public_id as string);
  });

  const updatedHotelData: HotelType = req.body;

  const newImageFiles = req.files as Express.Multer.File[];
  const newImageUrls = await uploadImagesToCloud(newImageFiles);

  updatedHotelData.imageUrls = newImageUrls;

  const newHotel = await Hotel.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    updatedHotelData,
    { runValidators: true, new: true }
  );

  if (!hotel) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Could not update Hotel,Please Try again later" });
  }
  return res.status(StatusCodes.OK).json(newHotel);
};

async function uploadImagesToCloud(imagefiles: Express.Multer.File[]) {
  const uploadPromises = imagefiles.map(async (image) => {
    const base64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + base64;

    const res = await cloudinary.v2.uploader.upload(dataURI);

    return res.url;
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
