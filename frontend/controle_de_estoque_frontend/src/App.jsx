import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/home/components/homePage';
import Navbar from './shared/components/Navbar';
import Funcionarios from './pages/funcionarios/components/Funcionario';
import Vendas from './pages/vendas/components/Vendas';
import Produtos from './pages/produtos/components/Produtos';
import ProjectsBoard from "./pages/projetos/ProjectsBoard";
import RfidEventLog from "./pages/rfid/RfidEventLog";
import Movimentacoes from "./pages/movimentacoes/Movimentacoes";
import './shared/styles/dataGridStyle.css';

function App() {
  
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projetos" element={<ProjectsBoard />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/rfid" element={<RfidEventLog />} />
            <Route path="/movimentacoes" element={<Movimentacoes />} />
          </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
