import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";

import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function HomePage() {
    return (
        <Box sx={{ padding: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Bem-vindo ao Sistema de Controle de Estoque
        </Typography>
  
        <Typography variant="body1" color="text.secondary" mb={4}>
          Aqui você pode visualizar os dados principais do estoque e navegar para outras seções.
        </Typography>
  
        <Paper elevation={3} sx={{ maxWidth: 600, margin: "0 auto", borderRadius: 3 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalMallIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Total de Produtos"
                secondary="Visualize todos os produtos cadastrados no estoque"
              />
            </ListItem>
            <Divider />
  
            <ListItem>
              <ListItemIcon>
                <ShoppingCartIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Histórico de Vendas"
                secondary="Consulte as últimas vendas realizadas"
              />
            </ListItem>
            <Divider />
  
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon color="action" />
              </ListItemIcon>
              <ListItemText
                primary="Funcionários"
                secondary="Veja os funcionários cadastrados no sistema"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    );
}

export default HomePage;