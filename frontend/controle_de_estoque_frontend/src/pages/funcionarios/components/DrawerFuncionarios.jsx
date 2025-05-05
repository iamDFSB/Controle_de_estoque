import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Drawer,
  TextField,
  MenuItem
} from "@mui/material";
import { postEmployee } from "../api/postEmployees";

const DrawerFuncionarios = ({ openDrawer, setOpenDrawer, setFuncionarios }) => {

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        position: '',
        salary: '',
        department: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await postEmployee(employee);
        console.log(response);
        setFuncionarios((prev) => [...prev, { ...response, id: prev.length + 1 }]);
        setEmployee({ nome: '', email: '', cargo: '' });
        setOpenDrawer(false);
      };

    return (
        <Box>
            {/* Drawer para adicionar nova venda */}
            <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Box sx={{ width: 350, padding: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Novo Funcionário
                    </Typography>

                    <Box>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={employee.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Cargo"
                            name="position"
                            value={employee.position}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Departamento"
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Salario"
                            name="salary"
                            type="number"
                            value={employee.salary}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

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
        </Box>
    )
}

export default DrawerFuncionarios;