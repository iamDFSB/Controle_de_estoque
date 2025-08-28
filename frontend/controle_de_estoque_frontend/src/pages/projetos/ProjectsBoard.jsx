import React, { useEffect, useMemo, useState } from "react";
import { Plus, Edit3, Trash2, GripVertical, Sparkles, Filter, RotateCcw, Zap, Building2, User, Calendar, DollarSign } from "lucide-react";
import { getAllProducts } from '../produtos/api/getProducts.js';
import './css/projects.css'
// Mock CSS styles - in real implementation, use external CSS file
const styles = `
.epic-board-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.bg-blob-1, .bg-blob-2, .bg-blob-3 {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

option {
    color: black;
}

.bg-blob-1 {
  width: 300px;
  height: 300px;
  background: #ff6b6b;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.bg-blob-2 {
  width: 200px;
  height: 200px;
  background: #4ecdc4;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.bg-blob-3 {
  width: 250px;
  height: 250px;
  background: #45b7d1;
  bottom: 20%;
  left: 50%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particleFloat 3s linear infinite;
}

@keyframes particleFloat {
  0% { opacity: 0; transform: translateY(100vh) rotate(0deg); }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-100px) rotate(360deg); }
}

.epic-header {
  position: relative;
  z-index: 20;
  backdrop-filter: blur(20px);
  background: rgb(44, 0, 174);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 2rem;
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  width: 2rem;
  height: 2rem;
  color: #fbbf24;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.8; transform: scale(1.1) rotate(5deg); }
}

.main-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  z-index: 1;
}

.search-input {
  padding: 0.75rem 0.75rem 0.75rem 2.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgb(0, 0, 0);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: black;
  font-size: 0.875rem;
  width: 320px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.reset-button, .create-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.create-button {
  background: linear-gradient(135deg, #10b981, #059669);
  border-color: transparent;
}

.reset-button:hover, .create-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.2);
}

.create-button:hover {
  background: linear-gradient(135deg, #059669, #047857);
}

.reset-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.kanban-column {
  width: calc((100vw - 12rem) / 5);
  min-width: 280px;
  max-width: 350px;
  flex-shrink: 0;
  flex-grow: 1;
  animation: slideInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.column-header {
  border-radius: 1rem 1rem 0 0;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.gradient-purple {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.gradient-blue {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.gradient-emerald {
  background: linear-gradient(135deg, #10b981, #059669);
}

.gradient-orange {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.gradient-pink {
  background: linear-gradient(135deg, #ec4899, #be185d);
}

.column-header-inner {
  position: relative;
  z-index: 2;
}

.column-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.column-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.priority-indicator {
  width: 0.5rem;
  height: 0.5rem;
  background: #fbbf24;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.card-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.add-card-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px dashed rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.add-card-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

.add-card-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.cards-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0 0 1rem 1rem;
  padding: 1rem;
  min-height: 200px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.cards-container-dragover {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
}

.card-wrapper {
  margin-bottom: 1rem;
  position: relative;
  transition: all 0.3s ease;
}

.card-wrapper:hover {
  transform: translateY(-2px);
}

.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-wrapper:hover .card-glow {
  opacity: 0.3;
}

.card-glow-high {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  opacity: 0.5;
}

.card-glow-normal {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.card-main {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0.75rem;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-main:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-priority-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.card-content {
  padding: 1rem;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.card-grip {
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  cursor: grab;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.card-grip:active {
  cursor: grabbing;
}

.card-text {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.card-description {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.4;
}

.card-company {
  font-size: 0.75rem;
  color: #059669;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.card-value {
  font-size: 0.75rem;
  color: #dc2626;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.card-responsible {
  font-size: 0.75rem;
  color: #7c3aed;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.action-edit {
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.1);
}

.action-edit:hover {
  background: rgba(59, 130, 246, 0.2);
}

.action-delete {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.action-delete:hover {
  background: rgba(220, 38, 38, 0.2);
}

.action-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.priority-toggle {
  width: 1.5rem;
  height: 0.75rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.priority-normal {
  background: #d1d5db;
}

.priority-high {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
}

.priority-toggle::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.priority-high::after {
  transform: translateX(12px);
}

.card-date {
  font-size: 0.625rem;
  color: #9ca3af;
  text-align: right;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fbbf24;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(220, 38, 38, 0.2);
  margin: 1rem;
  text-align: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.modal-close {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #e5e7eb;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-input, .form-textarea, .form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  color: black;
}

.form-select option {
  color: black;
  background-color: white;
}

.form-input:focus, .form-textarea:focus, .form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.produtos-section {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.produtos-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.produto-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.produto-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 0.75rem;
  align-items: end;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-danger {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-danger:hover {
  background: #b91c1c;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

@media (max-width: 1024px) {
  .epic-header {
    padding: 1rem;
  }
  
  .search-input {
    width: 240px;
  }
  
  .main-title {
    font-size: 1.5rem;
  }
  
  .kanban-column {
    width: 260px;
    min-width: 260px;
    flex-grow: 0;
  }
  
  main {
    padding: 1rem 2rem;
  }
  
  main > div {
    overflow-x: auto;
  }
  
  main > div > div {
    min-width: 1300px;
  }
}

@media (max-width: 768px) {
  .kanban-column {
    width: 240px;
    min-width: 240px;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .produto-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  main {
    padding: 1rem;
  }
  
  main > div > div {
    min-width: 1200px;
  }
}
`;

const DEFAULT_COLUMNS = [
  { 
    id: "col-proposta", 
    title: "Proposta Comercial", 
    gradient: "gradient-purple",
    accentColor: "purple",
    status: "Proposta Comercial"
  },
  { 
    id: "col-estoque", 
    title: "Estoque", 
    gradient: "gradient-blue",
    accentColor: "blue",
    status: "Estoque"
  },
  { 
    id: "col-compras", 
    title: "Compras", 
    gradient: "gradient-emerald",
    accentColor: "emerald",
    status: "Compras"
  },
  { 
    id: "col-faturamento", 
    title: "Faturamento", 
    gradient: "gradient-orange",
    accentColor: "orange",
    status: "Faturamento"
  },
  { 
    id: "col-entrega", 
    title: "Entrega", 
    gradient: "gradient-pink",
    accentColor: "pink",
    status: "Entregue"
  },
];

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const PROJECTS_API_URL = import.meta.env.VITE_PROJECTS_API_URL || `${API_BASE_URL}/projects/`;
const PRODUCTS_API_URL = import.meta.env.VITE_PRODUCT_API_URL || `${API_BASE_URL}/products/`;

// API Functions
async function fetchProjects() {
  try {
    const response = await fetch(PROJECTS_API_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw error;
  }
}

async function fetchProducts() {
  try {
    const data = await getAllProducts();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

async function createProject(projectData) {
  try {
    const response = await fetch(PROJECTS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    throw error;
  }
}

async function updateProject(projectId, projectData) {
  try {
    const response = await fetch(`${PROJECTS_API_URL}${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    throw error;
  }
}

async function deleteProject(projectId) {
  try {
    const response = await fetch(`${PROJECTS_API_URL}${projectId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return true;
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    throw error;
  }
}

function ProjectsBoard() {
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [draggedProject, setDraggedProject] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      setLoading(true);
      setError(null);
      const [projectsData, productsData] = await Promise.all([
        fetchProjects(),
        fetchProducts()
      ]);
      setProjects(projectsData?.projects || []);
      setProducts(productsData || []);
    } catch (error) {
      setError('Erro ao carregar dados: ' + error.message);
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  // Organize projects by columns
  const organizedData = useMemo(() => {
    // Ensure projects is always an array
    const projectsArray = Array.isArray(projects) ? projects : [];
    
    const filtered = projectsArray.filter((project) => {
      if (!filter.trim()) return true;
      const q = filter.toLowerCase();
      return (
        project.nome?.toLowerCase().includes(q) ||
        project.descricao?.toLowerCase().includes(q) ||
        project.empresa?.nome?.toLowerCase().includes(q) ||
        project.responsavel?.toLowerCase().includes(q)
      );
    });

    const columns = DEFAULT_COLUMNS.map(col => ({
      ...col,
      projects: filtered.filter(project => project.status === col.status)
    }));

    return { columns, allProjects: filtered };
  }, [projects, filter]);

  // Drag and drop handlers
  function handleDragStart(e, projectId) {
    setDraggedProject(projectId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", projectId);
  }

  function handleDragEnd() {
    setDraggedProject(null);
    setDragOverColumn(null);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDragEnter(e, columnId) {
    e.preventDefault();
    setDragOverColumn(columnId);
  }

  function handleDragLeave(e, columnId) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverColumn(null);
    }
  }

  async function handleDrop(e, targetColumnId) {
    e.preventDefault();
    setDragOverColumn(null);
    
    const projectId = e.dataTransfer.getData("text/plain");
    if (!projectId || !draggedProject) return;

    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const targetColumn = DEFAULT_COLUMNS.find(col => col.id === targetColumnId);
    if (!targetColumn || project.status === targetColumn.status) {
      setDraggedProject(null);
      return;
    }

    try {
      const updatedProject = { ...project, status: targetColumn.status };
      await updateProject(project.id, updatedProject);
      
      // Update local state
      setProjects(prev => prev.map(p => 
        p.id === project.id ? updatedProject : p
      ));
    } catch (error) {
      console.error('Erro ao mover projeto:', error);
      setError('Erro ao mover projeto: ' + error.message);
    } finally {
      setDraggedProject(null);
    }
  }

  async function handleDeleteProject(projectId) {
    if (!confirm("🗑️ Tem certeza que deseja remover este projeto?")) return;
    
    try {
      await deleteProject(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      setError('Erro ao deletar projeto: ' + error.message);
    }
  }

  function resetBoard() {
    if (!confirm("🔄 Recarregar dados do servidor? As alterações não salvas serão perdidas!")) return;
    loadInitialData();
    setFilter("");
  }

  if (loading) {
    return (
      <div className="epic-board-container">
        <style>{styles}</style>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="epic-board-container">
        <style>{styles}</style>
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadInitialData} className="btn-primary" style={{ marginTop: '1rem' }}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="epic-board-container">
      <style>{styles}</style>
      
      {/* Animated background */}
      <div className="animated-background">
        <div className="bg-blob-1"></div>
        <div className="bg-blob-2"></div>
        <div className="bg-blob-3"></div>
      </div>

      {/* Floating particles */}
      <div className="floating-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="epic-header">
        <div className="header-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="header-title">
                <Sparkles className="title-icon" />
                <h1 className="main-title">
                  Sistema de Gerenciamento de Projetos
                </h1>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="search-container">
                <Filter className="search-icon" />
                <input
                  placeholder="🔍 Filtrar projetos..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="search-input"
                />
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="create-button"
              >
                <Plus className="reset-icon" />
                <span>Novo Projeto</span>
              </button>
              <button 
                onClick={resetBoard}
                className="reset-button"
              >
                <RotateCcw className="reset-icon" />
                <span>Recarregar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="relative z-10 w-full px-6 py-6">
        <div className="w-full">
          <div className="flex gap-6 w-full justify-between">
            {organizedData.columns.map((column, columnIndex) => (
              <Column
                key={column.id}
                column={column}
                columnIndex={columnIndex}
                projects={column.projects}
                draggedProject={draggedProject}
                dragOverColumn={dragOverColumn}
                onDelete={handleDeleteProject}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, column.id)}
                onDragLeave={(e) => handleDragLeave(e, column.id)}
                onDrop={(e) => handleDrop(e, column.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          products={products}
          onClose={() => setShowCreateModal(false)}
          onSuccess={(newProject) => {
            setProjects(prev => [...prev, newProject]);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function Column({ 
  column, 
  columnIndex, 
  projects, 
  draggedProject, 
  dragOverColumn,
  onDelete,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop
}) {
  const projectCount = projects.length;
  const isDragOver = dragOverColumn === column.id;

  return (
    <div 
      className="kanban-column"
      style={{ animationDelay: `${columnIndex * 100}ms` }}
    >
      {/* Column Header */}
      <div className={`column-header ${column.gradient}`}>
        <div className="column-header-inner">
          <div className="column-title">
            <h2 className="column-name">
              {column.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="card-count">
                {projectCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Container */}
      <div
        className={`cards-container ${isDragOver ? 'cards-container-dragover' : ''}`}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        data-column-id={column.id}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            columnColor={column.accentColor}
            isDraggedProject={draggedProject === project.id}
            onDelete={() => onDelete(project.id)}
            onDragStart={(e) => onDragStart(e, project.id)}
            onDragEnd={onDragEnd}
          />
        ))}
        
        {projects.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: '0.875rem',
            padding: '2rem 1rem' 
          }}>
            {column.status === "Proposta Comercial" 
              ? "Clique em 'Novo Projeto' para começar" 
              : "Nenhum projeto nesta etapa"}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ 
  project, 
  columnColor, 
  isDraggedProject, 
  onDelete,
  onDragStart,
  onDragEnd
}) {
  if (!project) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div
      className={`card-wrapper ${isDraggedProject ? 'opacity-50' : ''}`}
      data-card-id={project.id}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {/* Card Glow Effect */}
      <div className={`card-glow card-glow-normal ${isDraggedProject ? 'animate-pulse scale-110' : ''}`} />
      
      {/* Main Card */}
      <div className="card-main">
        <div className="card-content">
          {/* Card Header */}
          <div className="card-header">
            <GripVertical 
              className={`card-grip ${isDraggedProject ? 'text-purple-400 scale-125' : ''}`}
            />
            <div className="card-text">
              <h3 className="card-title">
                {project.nome}
              </h3>
              {project.descricao && (
                <p className="card-description">
                  {project.descricao}
                </p>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>
            {project.empresa?.nome && (
              <div className="card-company">
                <Building2 style={{ width: '0.875rem', height: '0.875rem' }} />
                {project.empresa.nome}
              </div>
            )}
            
            <div className="card-value">
              <DollarSign style={{ width: '0.875rem', height: '0.875rem' }} />
              {formatCurrency(project.valorTotal)}
            </div>
            
            {project.responsavel && (
              <div className="card-responsible">
                <User style={{ width: '0.875rem', height: '0.875rem' }} />
                {project.responsavel}
              </div>
            )}
          </div>

          {/* Products Summary */}
          {project.produtos && project.produtos.length > 0 && (
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              marginBottom: '0.75rem',
              padding: '0.5rem',
              background: '#f9fafb',
              borderRadius: '0.375rem'
            }}>
              <strong>{project.produtos.length} produto{project.produtos.length > 1 ? 's' : ''}</strong>
              {project.produtos.length <= 3 && (
                <div style={{ marginTop: '0.25rem' }}>
                  {project.produtos.map((produto, i) => (
                    <div key={i} style={{ fontSize: '0.625rem' }}>
                      {produto.nome} (Qtd: {produto.quantidade})
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Card Actions */}
          <div className="card-actions">
            <div className="action-buttons">
              <button
                onClick={onDelete}
                className="action-button action-delete"
              >
                <Trash2 className="action-icon" />
                Excluir
              </button>
            </div>
          </div>

          {/* Creation Date */}
          <div className="card-date">
            <Calendar style={{ width: '0.75rem', height: '0.75rem' }} />
            {formatDate(project.dataInicio)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateProjectModal({ products, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    empresa: {
      nome: '',
      cnpj: '',
      contato: ''
    },
    produtos: [],
    valorTotal: 0,
    dataInicio: new Date().toISOString().split('T')[0],
    dataFim: '',
    responsavel: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Calculate total value when products change
    const total = formData.produtos.reduce((sum, produto) => sum + (produto.subtotal || 0), 0);
    setFormData(prev => ({ ...prev, valorTotal: total }));
  }, [formData.produtos]);

  function handleInputChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function handleEmpresaChange(field, value) {
    setFormData(prev => ({
      ...prev,
      empresa: { ...prev.empresa, [field]: value }
    }));
  }

  function addProduct() {
    const newProduct = {
      nome: '',
      quantidade: 1,
      precoUnitario: 0,
      subtotal: 0,
      fornecedor: ''
    };
    setFormData(prev => ({
      ...prev,
      produtos: [...prev.produtos, newProduct]
    }));
  }

  function updateProduct(index, field, value) {
    setFormData(prev => {
      const produtos = [...prev.produtos];
      produtos[index] = { ...produtos[index], [field]: value };
      
      // Recalculate subtotal if quantity or unit price changed
      if (field === 'quantidade' || field === 'precoUnitario') {
        produtos[index].subtotal = produtos[index].quantidade * produtos[index].precoUnitario;
      }
      
      return { ...prev, produtos };
    });
  }

  function removeProduct(index) {
    setFormData(prev => ({
      ...prev,
      produtos: prev.produtos.filter((_, i) => i !== index)
    }));
  }

  function selectExistingProduct(index, productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      updateProduct(index, 'nome', product.name || '');
      updateProduct(index, 'precoUnitario', product.price || 0);
      updateProduct(index, 'fornecedor', product.fornecedor || '');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.nome.trim()) {
        throw new Error('Nome do projeto é obrigatório');
      }
      if (!formData.empresa.nome.trim()) {
        throw new Error('Nome da empresa é obrigatório');
      }
      if (!formData.responsavel.trim()) {
        throw new Error('Responsável é obrigatório');
      }

      const projectData = {
        ...formData,
        status: 'Proposta Comercial' // Always start in first column
      };

      const newProject = await createProject(projectData);
      onSuccess(newProject);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Novo Projeto</h2>
          <button onClick={onClose} className="modal-close">
            ✕
          </button>
        </div>

        {error && (
          <div className="error-message" style={{ margin: '0 0 1rem 0' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="form-group">
            <label className="form-label">Nome do Projeto *</label>
            <input
              type="text"
              className="form-input"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-textarea"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
            />
          </div>

          {/* Company Info */}
          <div className="form-group">
            <label className="form-label">Empresa *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Nome da empresa"
              value={formData.empresa.nome}
              onChange={(e) => handleEmpresaChange('nome', e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">CNPJ</label>
              <input
                type="text"
                className="form-input"
                value={formData.empresa.cnpj}
                onChange={(e) => handleEmpresaChange('cnpj', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contato</label>
              <input
                type="text"
                className="form-input"
                value={formData.empresa.contato}
                onChange={(e) => handleEmpresaChange('contato', e.target.value)}
              />
            </div>
          </div>

          {/* Products Section */}
          <div className="produtos-section">
            <div className="produtos-header">
              <h3>Produtos</h3>
              <button type="button" onClick={addProduct} className="btn-primary">
                <Plus style={{ width: '1rem', height: '1rem' }} />
                Adicionar Produto
              </button>
            </div>

            {formData.produtos.map((produto, index) => (
              <div key={index} className="produto-item">
                <div className="produto-row">
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Produto</label>
                    <select
                      className="form-select"
                      value=""
                      onChange={(e) => selectExistingProduct(index, e.target.value)}
                      style={{ color: 'black' }}
                    >
                      <option value="" style={{ color: 'black' }}>Selecionar produto existente</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id} style={{ color: 'black' }}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      className="form-input"
                      style={{ marginTop: '0.25rem' }}
                      placeholder="Ou digite o nome do produto"
                      value={produto.nome || ''}
                      onChange={(e) => updateProduct(index, 'nome', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Quantidade</label>
                    <input
                      type="number"
                      className="form-input"
                      min="1"
                      value={produto.quantidade || 1}
                      onChange={(e) => updateProduct(index, 'quantidade', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Preço Unitário</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-input"
                      min="0"
                      value={produto.precoUnitario || 0}
                      onChange={(e) => updateProduct(index, 'precoUnitario', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="btn-danger"
                    style={{ marginTop: '1.5rem' }}
                  >
                    <Trash2 style={{ width: '1rem', height: '1rem' }} />
                  </button>
                </div>
                
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
                  <strong>Subtotal: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.subtotal)}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Other Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Data de Início *</label>
              <input
                type="date"
                className="form-input"
                value={formData.dataInicio}
                onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Data de Fim</label>
              <input
                type="date"
                className="form-input"
                value={formData.dataFim}
                onChange={(e) => handleInputChange('dataFim', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Responsável *</label>
            <input
              type="text"
              className="form-input"
              value={formData.responsavel}
              onChange={(e) => handleInputChange('responsavel', e.target.value)}
              required
            />
          </div>

          {/* Total Value Display */}
          <div style={{ 
            padding: '1rem', 
            background: '#f3f4f6', 
            borderRadius: '0.5rem', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0, color: '#059669', fontSize: '1.25rem' }}>
              Valor Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(formData.valorTotal)}
            </h3>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Criando...' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectsBoard;