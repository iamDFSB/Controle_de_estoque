import axios from 'axios';

export const getRfidEvents = async () => {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const response = await axios.get(`${url}/rfid/events`);
    return response.data.data;
};
