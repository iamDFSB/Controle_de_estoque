import axios from 'axios';

export const getAllEmployees = async () => {
    try {
        const url = import.meta.env.VITE_EMPLOYEE_API_URL || 'http://localhost:8000/employees/';
        const response = await axios.get(url);
        return response.data.employees.employees;
    } catch (error) {
        console.log(error.message);
        console.error('Error fetching products:', error);
        throw error;
    }
}