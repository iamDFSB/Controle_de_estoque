import axios from 'axios';

export const getMovements = async () => {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const response = await axios.get(`${url}/inventory/movements`);
    return response.data.data;
};
