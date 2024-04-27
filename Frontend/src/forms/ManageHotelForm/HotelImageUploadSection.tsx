import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export const HotelImageUploadSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-2">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageUrls", {
            required: "This field is required",
            validate: (files) => {
              if (files.length > 6) {
                return "Choose only 6 images";
              }
            },
          })}
        />
      </div>
      {errors.imageUrls && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageUrls.message}
        </span>
      )}
    </div>
  );
};

export default HotelImageUploadSection;
