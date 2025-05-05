import axios from 'axios';

export const postSale = async (sale) => {
    try {
        const url = import.meta.env.VITE_SALE_API_URL || 'http://localhost:8000/sales/';
        const response = await axios.post(url, {
            body: sale,
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.sale;
    } catch (error) {
        console.log(error.message);
        console.error('Error insert sale:', error);
        throw error;
    }
}