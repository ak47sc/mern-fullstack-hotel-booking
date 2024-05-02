import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

export const EditHotel = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: hotel } = useQuery(
    "GetSingleHotel",
    () => apiClient.getSingleMyHotel(id as string),
    {
      enabled: !!id,
    }
  );
  const { mutate, isLoading } = useMutation(apiClient.UpdateMyHotel, {
    onSuccess: () => {
      queryClient.invalidateQueries("GetSingleHotel");
    },
    onError: () => {},
  });

  const onSave = (formData: FormData) => {
    mutate(formData);
  };
  return (
    <ManageHotelForm hotel={hotel} onSave={onSave} isLoading={isLoading} />
  );
};
