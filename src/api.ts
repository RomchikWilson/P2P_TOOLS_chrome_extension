import axios from "axios";

const API_URL = "https://localhost:8000"; // Адрес твоего сервера

axios.defaults.withCredentials = true;

export const loginUser = async (username: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URL}/login/`,
            { username, password },
            { withCredentials: true }
        );

        console.log(response.data.message);
        return true;
    } catch {
        return false;
    }
};
