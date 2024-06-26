import HotelDetailsSection from "./HotelDetailsSection";
import { FormProvider, useForm } from "react-hook-form";
import HotelTypesSection from "./HotelTypesSection";
import HotelFacilitiesSection from "./HotelFacilitiesSection";
import HotelGuestsSection from "./HotelGuestsSection";
import HotelImageUploadSection from "./HotelImageUploadSection";
import { HotelType } from "../../../../Backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  adultCount: number;
  childCount: number;
  type: string;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: File[];
  imageUrls: string[];
};

type props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};
const ManageHotelForm = ({ isLoading, onSave, hotel }: props) => {
  const formMethods = useForm<HotelFormData>();
  const { reset, handleSubmit } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit(async (data: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("_id", hotel._id);
    }
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((facility, idx) => {
      formData.append(`facilities[${idx}]`, facility);
    });

    const newImagesBlobpromises = data.imageUrls.map(async (url) => {
      const res = await fetch(url);
      return res.blob();
    });

    const newImagesBlobArray = await Promise.all(newImagesBlobpromises);

    newImagesBlobArray.forEach((blob, idx) =>
      formData.append(
        "imageUrls",
        new File([blob], `${idx}`, { type: blob.type })
      )
    );

    onSave(formData);
    formMethods.watch("imageUrls").forEach((url) => URL.revokeObjectURL(url));
    reset();
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <HotelDetailsSection />
        <HotelTypesSection />
        <HotelFacilitiesSection />
        <HotelGuestsSection />
        <HotelImageUploadSection />
        <button
          disabled={isLoading}
          className="self-end bg-blue-600 text-white py-1 px-4 font-bold rounded text-2xl hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          type="submit"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
