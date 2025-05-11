import axios from "axios";
import { ProfileData } from "../types/profileTypes";

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const getProfileData = async (): Promise<ProfileData> => {
  const response = await axios.get<ProfileData>(`${SERVER_URL}/profile/`, {
    withCredentials: true,
  });
  return response.data;
};