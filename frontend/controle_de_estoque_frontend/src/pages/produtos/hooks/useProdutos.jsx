import { useEffect, useState } from 'react';
import { getAllProducts } from '../api/getProducts';

export const useProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    useEffect(() => {
      getAllProducts()
      .then((products) =>{
        console.log(products);
        setProdutos(products);
      })
      .catch((err) => {
        console.error(err);
        setErro('Error fetching products');
      })
      .finally(() => {
        setLoading(false);
      });
    }, []);


    return { produtos, loading, erro, setProdutos };
};
