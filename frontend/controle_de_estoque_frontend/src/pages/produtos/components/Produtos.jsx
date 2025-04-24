import React, { useState } from 'react'
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nome", headerName: "Nome do Produto", flex: 1 },
    {
      field: "preco",
      headerName: "Preço",
      width: 120,
      valueFormatter: (params) =>{
        if (params){
            console.log("Params: ", params);
            const number = Number(params);
            console.log("Number: ", number);
            return `R$ ${number.toFixed(2)}`.replace(".", ",")
        }
      },
    },
    { field: "quantidade", headerName: "Quantidade", width: 130 },
    { field: "descricao", headerName: "Descrição", flex: 1.5 },
  ];
  
  const rows = [
    {
      id: 1,
      nome: "Mouse Gamer",
      preco: 150.99,
      quantidade: 30,
      descricao: "Mouse ergonômico com LED RGB",
    },
    {
      id: 2,
      nome: "Teclado Mecânico",
      preco: 320.0,
      quantidade: 15,
      descricao: "Switch Blue, ideal para digitação e jogos",
    },
    {
      id: 3,
      nome: "Monitor 24''",
      preco: 899.9,
      quantidade: 10,
      descricao: "Full HD, painel IPS, 75Hz",
    },
  ];

function Produtos() {
    return (
        
    <Box sx={{ padding: 4, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Lista de Produtos
      </Typography>

      <Box
        sx={{
          height: 400,
          width: "100%",
          maxWidth: "100%",
          mx: "auto",
          mt: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
    );
}

export default Produtos;