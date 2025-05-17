import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Drawer,
  TextField,
  MenuItem,
  Paper,
} from "@mui/material";
import { useProdutos } from "../../produtos/hooks/useProdutos";
import { useFuncionarios } from "../../funcionarios/hooks/useFuncionarios";
import { postSale } from "../api/postSale";

const DrawerVendas = ({ openDrawer, setOpenDrawer, setVendas }) => {
    const { produtos } = useProdutos();
    const { funcionarios } = useFuncionarios();
    
    const [sale, setSale] = useState({
        product: "",
        quantity: "",
        employee: "",
        total_price: ""
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(sale);
        const novaVenda = {
          total_price: Number.parseFloat(sale.total_price),
          product_id: sale.product,
          quantity: Number.parseInt(sale.quantity),
          employee_id: sale.employee,
          sale_date: new Date().toISOString(), // data de hoje
        };

        const response = await postSale(novaVenda);
        console.log(response);

        // setVendas((prev) => [...prev, response]);
        setSale({
            product: "",
            quantity: "",
            employee: "",
            total_price: ""
        });
        setOpenDrawer(false);
        document.location.reload();
    };

    const handleChange = (e) => {
        setSale({ ...sale, [e.target.name]: e.target.value });
    };

    return (
        <>
        {/* Drawer para adicionar nova venda */}
        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Box sx={{ width: 350, padding: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Nova Venda
                </Typography>

                <Box>
                    <TextField
                        label="Produto"
                        name="product"
                        select
                        fullWidth
                        required
                        value={sale.product}
                        onChange={handleChange}
                        margin="normal"
                        >
                            {produtos.map((p) => (
                                <MenuItem key={p.id} value={p.id}>
                                {p.name}
                                </MenuItem>
                            ))}
                    </TextField>

                    <TextField
                        label="Quantidade"
                        name="quantity"
                        type="number"
                        fullWidth
                        required
                        value={sale.quantity}
                        onChange={handleChange}
                        margin="normal"
                    />

                    <TextField
                        label="Preço Total"
                        name="total_price"
                        type="number"
                        fullWidth
                        required
                        value={sale.total_price}
                        onChange={handleChange}
                        margin="normal"
                    />  

                    <TextField
                        label="Funcionário"
                        name="employee"
                        select
                        fullWidth
                        required
                        value={sale.employee}
                        onChange={handleChange}
                        margin="normal"
                        >
                        {funcionarios.map((f) => (
                            <MenuItem key={f.id} value={f.id}>
                            {f.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                    >
                    Salvar Venda
                    </Button>
                </Box>
            </Box>
        </Drawer>
        </>
    );
}

export default DrawerVendas;