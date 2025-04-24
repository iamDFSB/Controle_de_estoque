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
import { DataGrid } from "@mui/x-data-grid";

export default function Vendas() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [form, setForm] = useState({
    produto: "",
    quantidade: "",
    funcionario: "",
  });

  // Simulando dados do banco
  const [vendas, setVendas] = useState([
    {
      id: 1,
      produto: "Mouse Gamer",
      quantidade: 2,
      funcionario: "João Silva",
      data: "2025-04-15",
    },
    {
      id: 2,
      produto: "Monitor 24''",
      quantidade: 1,
      funcionario: "Maria Oliveira",
      data: "2025-04-16",
    },
  ]);

  const produtos = [
    { id: 1, nome: "Mouse Gamer" },
    { id: 2, nome: "Teclado Mecânico" },
    { id: 3, nome: "Monitor 24''" },
  ];

  const funcionarios = [
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Oliveira" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaVenda = {
      id: vendas.length + 1,
      produto:
        produtos.find((p) => p.id === parseInt(form.produto))?.nome || "",
      quantidade: parseInt(form.quantidade),
      funcionario:
        funcionarios.find((f) => f.id === parseInt(form.funcionario))?.nome ||
        "",
      data: new Date().toISOString().split("T")[0], // data de hoje
    };

    setVendas((prev) => [...prev, novaVenda]);
    setOpenDrawer(false);
    setForm({ produto: "", quantidade: "", funcionario: "" });

    // Aqui entraria o fetch ou axios para salvar no banco
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "produto", headerName: "Produto", flex: 1 },
    { field: "quantidade", headerName: "Quantidade", width: 120 },
    { field: "funcionario", headerName: "Funcionário", flex: 1 },
    { field: "data", headerName: "Data da Venda", width: 150 },
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Vendas Realizadas
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenDrawer(true)}
          sx={{ borderRadius: 2 }}
        >
          Adicionar Venda
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          height: 430,
          width: "100%",
          maxWidth: "100%",
          mx: "auto",
          p: 2,
        }}
      >
        <DataGrid
          rows={vendas}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* Drawer para adicionar nova venda */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 350, padding: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Nova Venda
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Produto"
              name="produto"
              select
              fullWidth
              required
              value={form.produto}
              onChange={handleChange}
              margin="normal"
            >
              {produtos.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.nome}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Quantidade"
              name="quantidade"
              type="number"
              fullWidth
              required
              value={form.quantidade}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              label="Funcionário"
              name="funcionario"
              select
              fullWidth
              required
              value={form.funcionario}
              onChange={handleChange}
              margin="normal"
            >
              {funcionarios.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.nome}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Salvar Venda
            </Button>
          </form>
        </Box>
      </Drawer>
    </Box>
  );
}
