import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

export const MyHotels = () => {
  const { data: HotelData } = useQuery(
    "fetchAllHotels",
    apiClient.getAllMyHotel,
    {
      onError: (err: Error) => {
        console.log(err.message);
      },
    }
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">My Hotels</h2>
        <Link
          className="bg-blue-600 text-white p-2 font-semibold rounded text-xl hover:bg-blue-500"
          to={"/new-hotel"}
        >
          Add Hotel
        </Link>
      </div>
      {!HotelData || HotelData.length === 0 ? (
        <span>No Hotels Found</span>
      ) : (
        <div className="flex flex-col gap-4">
          {HotelData.map((hotel) => {
            return (
              <div
                key={hotel._id}
                id={hotel._id}
                className="flex flex-col gap-4 rounded-md p-4 border border-gray-400"
              >
                <h2 className="text-xl font-bold">{hotel.name}</h2>
                <span>{hotel.description}</span>
                <div className="flex flex-col lg:flex-row gap-2">
                  <span className="border border-gray-400 p-2 flex items-center gap-2">
                    <BsMap />
                    {`${hotel.city}, ${hotel.country}`}
                  </span>
                  <span className="border border-gray-400 p-2 flex items-center gap-2">
                    <BsBuilding />
                    {hotel.type}
                  </span>
                  <span className="border border-gray-400 p-2 flex items-center gap-2">
                    <BiMoney />
                    {`${hotel.pricePerNight}/night`}
                  </span>
                  <span className="border border-gray-400 p-2 flex items-center gap-2">
                    <BiHotel />
                    {`${hotel.adultCount} adults, ${hotel.childCount} Children`}
                  </span>
                  <span className="border border-gray-400 p-2 flex items-center gap-2">
                    <BiStar />
                    {`${hotel.starRating} Star Rating`}
                  </span>
                </div>
                <Link
                  className="bg-blue-600 text-white p-2 font-semibold rounded text-xl self-end hover:bg-blue-500"
                  to={`/edit-hotel/${hotel._id}`}
                >
                  View Details
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyHotels;
