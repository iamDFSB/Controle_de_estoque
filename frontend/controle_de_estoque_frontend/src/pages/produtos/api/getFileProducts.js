import axios from 'axios';

export const getFileProducts = async (listProducts) => {
    try {
        const url = import.meta.env.VITE_PRODUCT_API_URL + 'products_file' || 'http://localhost:8000/products/products_file';
        const response = await axios.post(url, listProducts, {
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'blob' // para lidar com CSV no download
        });

        // Criar o download do arquivo CSV no navegador
        const blob = new Blob([response.data], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'products.csv';
        link.click();

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
