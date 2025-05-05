import { useEffect, useState } from 'react';
import { getAllEmployees } from '../api/getEmployees';

export const useFuncionarios = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
      getAllEmployees()
        .then((employees) => {
          console.log(employees);
          setFuncionarios(employees);
        })
        .catch((err) => {
          console.error(err);
          setErro('Error fetching employees');
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    return { funcionarios, loading, erro, setFuncionarios };
};
