import { useEffect, useState } from 'react';
import { getAllSales } from '../api/getSales';
import { getAllProducts } from '../../produtos/api/getProducts';
import { getAllEmployees } from '../../funcionarios/api/getEmployees';

export const useSales = () => {
    const [sales, setSales] = useState([]);

    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    // let products;
    // let employees;
    useEffect(() => {
        getAllSales()
            .then((salesResponse) => {
                console.log(salesResponse);
                setSales(salesResponse);
            })
            .catch((err) => {
                console.error(err);
                setErro('Error fetching sales');
            })
            .finally(() => {
                setLoading(false);
            });


        // getAllProducts()
        //     .then((response) => {
        //         products = response;
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //         setErro('Error fetching sales');
        //     })
        //     .finally(() => {
        //         getAllEmployees()
        //             .then((response) => {
        //                 employees = response;
        //             })
        //             .catch((err) => {
        //                 console.error(err);
        //                 setErro('Error fetching sales');
        //             })
        //             .finally(() => {
        //                 getAllSales()
        //                     .then((salesResponse) => {
        //                         const salesFormatted = salesResponse.map((sale) => {
        //                             sale.product = products.find((product) => product?.id === sale.product_id)?.name || "";
        //                             sale.employee = employees.find((employee) => employee?.id === sale.employee_id)?.name || "";
        //                             return sale;
        //                         })
        //                         console.log(salesFormatted);
        //                         setSales(salesFormatted);
        //                     })
        //                     .catch((err) => {
        //                         console.error(err);
        //                         setErro('Error fetching sales');
        //                     })
        //                     .finally(() => {
        //                         setLoading(false);
        //                     });
        //             })
        //     })
         


    }, []);


    return { sales, loading, erro, setSales };
};