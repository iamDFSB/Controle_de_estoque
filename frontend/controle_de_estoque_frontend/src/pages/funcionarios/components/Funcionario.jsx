import React, { useState } from 'react'
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


function Funcionarios() {
    const columns = [
        { field: "id", headerName: "ID do Funcionário", flex: .5 },
        { field: "nome", headerName: "Nome do Funcionário", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
      ];
      
    
    const rows = [
    {
        id: 1,
        nome: "Morgan Brown",
        email: "morgan@gmail.com"
    },
    {
        id: 2,
        nome: "Juliana Yukio",
        email: "juliana.yu@gmail.com"
    },
    {
        id: 3,
        nome: "Lucas Joo",
        email: "lucas.jo@gmail.com"
    },
    ];
    return (
        <Box sx={{ padding: 4, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Lista de Funcionários
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
            pageSize={3}
            rowsPerPageOptions={[10]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    );
}

export default Funcionarios;