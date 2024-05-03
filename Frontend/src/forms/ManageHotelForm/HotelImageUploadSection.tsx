import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";

export const HotelImageUploadSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    urlToDelete: string
  ) => {
    e.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== urlToDelete)
    );
    URL.revokeObjectURL(urlToDelete);
  };

  const handlePreview = () => {
    Array.from(watch("imageFiles")).forEach((file) =>
      setValue("imageUrls", [
        ...(watch("imageUrls") || []),
        URL.createObjectURL(file),
      ])
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-2 flex flex-col gap-2">
        <div className="grid grid-cols-7 gap-2">
          <label className="h-52 group w-full bg-gray-200 flex justify-center items-center hover:bg-gray-300">
            <BsPlusCircleFill className="w-10 h-10 transition-all group-hover:scale-125" />
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full text-gray-700 font-normal hidden"
              {...register("imageFiles", {
                onChange: handlePreview,
                validate: () => {
                  const totalLength = existingImageUrls.length;

                  if (totalLength == 0) {
                    return "Choose atleast one image";
                  }
                  if (totalLength > 6) {
                    return "Choose only 6 images";
                  }
                },
              })}
            />
          </label>
          {existingImageUrls?.map((url) => {
            return (
              <div className="relative group" key={url}>
                <img className="h-52 object-cover" src={url} alt="image" />
                <button
                  className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100"
                  onClick={(e) => handleDelete(e, url)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <p>Choose (1 to 6) images</p>
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default HotelImageUploadSection;
