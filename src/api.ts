import axios from "axios";

export const SERVER_URL = import.meta.env.VITE_SERVER_URL

axios.defaults.withCredentials = true;

export const loginUser = async (username: string, password: string): Promise<boolean> => {
    try {
        console.log(SERVER_URL)
        const response = await axios.post(`${SERVER_URL}/login/`,
            { username, password },
            { withCredentials: true }
        );

        console.log(response.data.message);
        return true;
    } catch {
        return false;
    }
};

export const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await axios.get(`${SERVER_URL}/auth-status/`, {
        withCredentials: true,
      });
  
      return response.data.authenticated;
    } catch (error) {
      return false;
    }
  };

export const logout = async () => {
try {
    await axios.post(`${SERVER_URL}/logout/`, {}, {
        withCredentials: true,
    });
} catch (error) {
    console.error("Ошибка при выходе:", error);
}
};

export interface ActiveOrder {
  id: number;
  totalProgress: number;
  currentProgress: number;
  exchangeType: string;
}

export interface ProfileData {
  userInfo: {
    full_name: string;
  };
  lastMonthResult: {
    income: number;
    loss: number;
  };
  activeOrders: ActiveOrder[];
}

export const getProfileData = async (): Promise<ProfileData | null> => {
  try {
    const response = await axios.get(`${SERVER_URL}/profile/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка получения профиля:", error);
    return null;
  }
};