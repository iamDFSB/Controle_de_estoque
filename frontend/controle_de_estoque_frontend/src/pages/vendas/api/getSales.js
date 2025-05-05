import axios from 'axios';

export const getAllSales = async () => {
    try {
        const url = import.meta.env.VITE_SALE_API_URL || 'http://localhost:8000/sales/';
        const response = await axios.get(url);
        return response.data.sales.sales;
    } catch (error) {
        console.log(error.message);
        console.error('Error fetching sales:', error);
        throw error;
    }
}