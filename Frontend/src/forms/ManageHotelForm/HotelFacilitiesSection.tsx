import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
const HotelFacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
        {hotelFacilities.map((facility, index) => (
          <label
            key={index}
            className="cursor-pointer font-bold bg-blue-200 rounded-full py-2 px-5 has-[:checked]:bg-blue-800 has-[:checked]:text-white"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                required: "This field is required",
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default HotelFacilitiesSection;
