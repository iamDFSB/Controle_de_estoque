import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/home/components/homePage';
import Navbar from './shared/components/Navbar';
import Funcionarios from './pages/funcionarios/components/Funcionario';
import Vendas from './pages/vendas/components/Vendas';
import Produtos from './pages/produtos/components/Produtos';

function App() {
  
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/vendas" element={<Vendas />} />
          </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
