import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
const HotelTypesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
        {hotelTypes.map((option, index) => (
          <label
            key={index}
            className="cursor-pointer font-bold bg-blue-200 rounded-full py-2 px-5 has-[:checked]:bg-blue-800 has-[:checked]:text-white"
          >
            <input
              type="radio"
              value={option}
              {...register("type", { required: "This field is required" })}
              className="appearance-none"
            />
            {option}
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default HotelTypesSection;
