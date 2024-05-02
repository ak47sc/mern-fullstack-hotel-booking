import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import React from "react";

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
        {existingImageUrls && (
          <div className="h-52 grid grid-cols-6 gap-2">
            {existingImageUrls?.map((url) => {
              return (
                <div className="relative group" key={url}>
                  <img
                    className="min-h-full object-cover"
                    src={url}
                    alt="image"
                  />
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
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
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
