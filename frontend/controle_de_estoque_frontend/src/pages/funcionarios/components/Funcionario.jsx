import React, { useState } from 'react'
import { Box, Typography, Button, Alert  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import DrawerFuncionarios from './DrawerFuncionarios.jsx';
import columns from '../api/dataGridColumns.js';
import { useFuncionarios } from '../hooks/useFuncionarios.jsx';


const Funcionarios = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const { funcionarios, setFuncionarios } = useFuncionarios();

    return (
        <Box sx={{ padding: 4, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              alignItems: "center",
            }}
          >

            <Typography variant="h4" fontWeight={600} gutterBottom>
              Lista de Funcionários
            </Typography>

            <Button
              variant="contained"
              onClick={() => setOpenDrawer(true)}
              sx={{ borderRadius: 2 }}
            >
              Adicionar Funcionário
            </Button>
          </Box>

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
              rows={funcionarios}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[10]}
              disableRowSelectionOnClick
            />
          </Box>

          <DrawerFuncionarios 
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer} 
            setFuncionarios={setFuncionarios}
          />
      </Box>
    );
}

export default Funcionarios;