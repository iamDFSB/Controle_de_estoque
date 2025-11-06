import React, { useState } from 'react'
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DrawerProdutos from './DrawerProdutos';
import { useProdutos } from '../hooks/useProdutos';
import columns from '../api/dataGridColumns';
import { getFileProducts } from '../api/getFileProducts';

const Produtos = () => {
    const { produtos, loading, erro, setProdutos } = useProdutos();
    const [openDrawer, setOpenDrawer] = useState(false);

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
              Lista de Produtos
            </Typography>
            <Box sx={{}}>
              <Button
                variant="contained"
                onClick={() => getFileProducts(produtos)}
                sx={{ borderRadius: 2, marginRight: 2 }}
              >
                Baixar Base
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenDrawer(true)}
                sx={{ borderRadius: 2 }}
              >
                Adicionar Produto
              </Button>
            </Box>
        </Box>

        <Box
          sx={{
            height: 400,
            width: "100%",
            maxWidth: "100%",
            mx: "auto",
            mt: 3,
            borderRadius: 2,
            boxShadow: 3,
            padding: 2,
          }}
        >
            <DataGrid
              rows={produtos}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableRowSelectionOnClick
            />
        </Box>
        
        <DrawerProdutos 
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setProdutos={setProdutos}
        />
      </Box>
    );
}

export default Produtos;