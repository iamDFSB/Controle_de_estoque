import axios from 'axios';


export const postProduct = async (product) => {
    try {
        console.log(product);
        const url = import.meta.env.VITE_PRODUCT_API_URL || 'http://localhost:8000/products/';
        const response = await axios.post(url, {
            body: product,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        return response.data.product;
    } catch (error) {
        console.log(error.message);
        console.error('Error fetching products:', error);
        throw error;
    }
}