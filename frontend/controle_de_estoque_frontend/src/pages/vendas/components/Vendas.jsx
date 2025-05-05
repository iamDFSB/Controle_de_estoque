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

import DrawerVendas from "./DrawerVendas";
import { useSales } from "../hooks/useSales";
import columns from "../api/dataGridColumns";

const Vendas = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { sales, loading, erro, setSales } = useSales();

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
          rows={sales}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
        />
      </Paper>
      <DrawerVendas 
        openDrawer={openDrawer}
        setVendas={setSales}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
}

export default Vendas;