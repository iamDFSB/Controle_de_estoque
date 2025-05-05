import axios from 'axios';

export const getAllProducts = async () => {
    try {
        const url = import.meta.env.VITE_PRODUCT_API_URL || 'http://localhost:8000/products/';
        const response = await axios.get(url);
        return response.data.products.products;
    } catch (error) {
        console.log(error.message);
        console.error('Error fetching products:', error);
        throw error;
    }
}