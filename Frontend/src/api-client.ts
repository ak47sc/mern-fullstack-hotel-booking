import { RegisterFormData } from "./pages/Register";
import { SignInFormType } from "./pages/SignIn";
import { HotelType } from "../../Backend/src/shared/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormType) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token Invalid");
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error during logout");
  }
};

export const addHotel = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Error to register hotel");
  }
  return response.json();
};

export const getAllMyHotel = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/my-hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error to fetch hotels");
  }
  return response.json();
};
export const getSingleMyHotel = async (id: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/my-hotels/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error to fetch hotels");
  }
  return response.json();
};

export const UpdateMyHotel = async (formData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/my-hotels/${formData.get("_id")}`,
    {
      credentials: "include",
      body: formData,
      method: "PATCH",
    }
  );
  if (!response.ok) {
    throw new Error("Error to Update hotels");
  }
  return response.json();
};
