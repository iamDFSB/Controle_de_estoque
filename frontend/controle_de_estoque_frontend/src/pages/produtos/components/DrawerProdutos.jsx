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

import { postProduct } from "../api/postProducts";

const DrawerProdutos = ({ openDrawer, setOpenDrawer, setProdutos }) => {
    const [produto, setProduto] = useState({
        name: "",
        price: "",
        quantity: "",
        description: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduto((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
        const response = await postProduct(produto);
        console.log(response);
        setProdutos((prev) => [...prev, response]);
        setProduto({
            name: "",
            price: "",
            quantity: "",
            description: "",
        });
        setOpenDrawer(false);
    }

    return (
      <Box>
        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Box sx={{ width: 350, padding: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Adicionar Produto
                </Typography>
                <Box>
                    <TextField
                        label="Nome do Produto"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="name"
                        required
                        value={produto.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Preço"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="price"
                        value={produto.price}
                        type="number"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Quantidade"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="quantity"
                        type="number"
                        value={produto.quantity}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Descrição"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="description"
                        multiline
                        rows={3}
                        value={produto.description}
                        onChange={handleChange}
                    />
                    <Button 
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 3 }}
                      onClick={handleSubmit}
                    >
                        Adicionar Produto
                    </Button>
                </Box>
            </Box>
        </Drawer>
      </Box>
    );
}

export default DrawerProdutos;