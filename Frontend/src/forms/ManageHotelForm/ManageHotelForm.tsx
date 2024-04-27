import HotelDetailsSection from "./HotelDetailsSection";
import { FormProvider, useForm } from "react-hook-form";
import HotelTypesSection from "./HotelTypesSection";
import HotelFacilitiesSection from "./HotelFacilitiesSection";
import HotelGuestsSection from "./HotelGuestsSection";
import HotelImageUploadSection from "./HotelImageUploadSection";

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
  imageUrls: FileList;
};

type props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};
const ManageHotelForm = ({ isLoading, onSave }: props) => {
  const formMethods = useForm<HotelFormData>();

  const onSubmit = formMethods.handleSubmit((data: HotelFormData, e) => {
    const formData = new FormData();
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

    Array.from(data.imageUrls).forEach((image) => {
      formData.append("imageFiles", image);
    });

    onSave(formData);
    e?.target.reset();
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
