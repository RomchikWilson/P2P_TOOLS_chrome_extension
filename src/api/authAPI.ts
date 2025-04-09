import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL

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