import axios from 'axios';

export const postEmployee = async (employee) => {
    try {
        const url = import.meta.env.VITE_EMPLOYEE_API_URL || 'http://localhost:8000/employees/';
        const response = await axios.post(url, {
            body: employee,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.employee;
    } catch (error) {
        console.log(error.message);
        console.error('Error fetching products:', error);
        throw error;
    }
}