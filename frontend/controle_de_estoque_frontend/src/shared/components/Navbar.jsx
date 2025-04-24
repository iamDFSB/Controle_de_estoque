import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";


export default function Navbar() {
  const pages = [
        {button: "Home", value: "", icon: <HomeIcon/>},
        {button: "Produtos", value: "produtos", icon: <LocalMallIcon/>}, 
        {button: "Funcionários", value: "funcionarios",  icon: <AccountCircleIcon/>}, 
        {button: "Vendas", value: "vendas",  icon: <ShoppingCartIcon/>},
    ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const pagesLinks = {
    produtos: document.location.href + "produtos"
  }

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (page) => {
    console.log("Navegando para:", page);
    const link = pagesLinks[page];
    console.log(link, page);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1e1e2f", boxShadow: "none" }}>
        <Toolbar sx={{ px: 2 }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}


          <Typography variant="h6" sx={{ 
              flexGrow: 1, 
              fontWeight: 600, 
              display: "flex", 
              gap: "1rem"
            }}>
              {!isMobile && (
                <AssignmentIcon sx={{alignSelf: "center"}}/>
              )}
            Controle de Estoque
          </Typography>
          

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {pages.map((page) => (
                <Button
                  key={page.value}
                  color="inherit"
                  component={Link}
                  to={`/${page.value.toLowerCase()}`}
                  onClick={() => handleMenuClick(page.value)}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#2d2d44",
                    },
                  }}
                >
                  {page.button}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { backgroundColor: "#1e1e2f", color: "#fff" },
        }}
      >
        <List sx={{ width: 250 }}>
          {pages.map((page) => (
            <ListItem
              button
              key={page.value}
              component={Link}
              to={`/${page.value.toLowerCase()}`}
              onClick={() => handleMenuClick(page.value)}
              sx={{
                "&:hover": {
                  backgroundColor: "#2d2d44",
                  color: "white" 
                },
                display: "flex",
                gap: "1rem"
              }}
            >
              {page.icon}
              <ListItemText primary={page.button} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
