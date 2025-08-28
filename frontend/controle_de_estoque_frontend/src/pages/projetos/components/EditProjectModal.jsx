import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { getAllProducts } from '../../produtos/api/getProducts.js';

const EditProjectModal = ({ isOpen, onClose, onSubmit, project }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    empresa: {
      nome: '',
      cnpj: '',
      contato: ''
    },
    produtos: [],
    dataInicio: '',
    dataFim: '',
    responsavel: ''
  });

  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState('');

  // Initialize form data when project changes
  useEffect(() => {
    if (project && isOpen) {
      setFormData({
        nome: project.nome || '',
        descricao: project.descricao || '',
        empresa: {
          nome: project.empresa?.nome || '',
          cnpj: project.empresa?.cnpj || '',
          contato: project.empresa?.contato || ''
        },
        dataInicio: project.dataInicio || '',
        dataFim: project.dataFim || '',
        responsavel: project.responsavel || ''
      });
      setSelectedProducts(project.produtos || []);
    }
  }, [project, isOpen]);

  // Fetch products when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await getAllProducts();
      setAvailableProducts(products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search term
  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('empresa.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        empresa: { ...prev.empresa, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addProductToProject = (product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      alert('Produto já adicionado ao projeto');
      return;
    }

    const newSelectedProduct = {
      id: product.id,
      nome: product.name,
      quantidade: 1,
      precoUnitario: product.price,
      subtotal: product.price * 1,
      fornecedor: ''
    };

    setSelectedProducts(prev => [...prev, newSelectedProduct]);
  };

  const updateProductQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeProductFromProject(productId);
      return;
    }

    setSelectedProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? {
              ...product,
              quantidade: quantity,
              subtotal: product.precoUnitario * quantity
            }
          : product
      )
    );
  };

  const updateProductPrice = (productId, price) => {
    setSelectedProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? {
              ...product,
              precoUnitario: price,
              subtotal: price * product.quantidade
            }
          : product
      )
    );
  };

  const updateProductSupplier = (productId, supplier) => {
    setSelectedProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, fornecedor: supplier }
          : product
      )
    );
  };

  const removeProductFromProject = (productId) => {
    setSelectedProducts(prev => prev.filter(product => product.id !== productId));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => total + product.subtotal, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nome.trim()) {
      alert('Nome do projeto é obrigatório');
      return;
    }
    
    if (!formData.empresa.nome.trim()) {
      alert('Nome da empresa é obrigatório');
      return;
    }
    
    if (!formData.responsavel.trim()) {
      alert('Responsável é obrigatório');
      return;
    }

    const projectData = {
      ...formData,
      produtos: selectedProducts,
      valorTotal: calculateTotal()
    };

    onSubmit(projectData);
    handleClose();
  };

  const handleClose = () => {
    setProductSearchTerm('');
    onClose();
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Editar Projeto</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Project Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Projeto *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsável *
              </label>
              <input
                type="text"
                name="responsavel"
                value={formData.responsavel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Company Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações da Empresa</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  name="empresa.nome"
                  value={formData.empresa.nome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNPJ
                </label>
                <input
                  type="text"
                  name="empresa.cnpj"
                  value={formData.empresa.cnpj}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contato
                </label>
                <input
                  type="text"
                  name="empresa.contato"
                  value={formData.empresa.contato}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Início
              </label>
              <input
                type="date"
                name="dataInicio"
                value={formData.dataInicio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Fim (opcional)
              </label>
              <input
                type="date"
                name="dataFim"
                value={formData.dataFim}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Product Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <ShoppingCart className="mr-2" size={20} />
              Gerenciar Produtos
            </h3>
            
            {/* Product Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Available Products */}
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-700 mb-2">Produtos Disponíveis</h4>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">Carregando produtos...</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">Nenhum produto encontrado</div>
                ) : (
                  filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50"
                    >
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                        <div className="text-sm text-green-600">
                          R$ {product.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addProductToProject(product)}
                        className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Selected Products */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Produtos do Projeto ({selectedProducts.length})
              </h4>
              {selectedProducts.length === 0 ? (
                <div className="p-4 text-center text-gray-500 border border-gray-200 rounded-md">
                  Nenhum produto no projeto
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedProducts.map(product => (
                    <div key={product.id} className="p-3 border border-gray-200 rounded-md bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{product.nome}</span>
                        <button
                          type="button"
                          onClick={() => removeProductFromProject(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Quantidade</label>
                          <input
                            type="number"
                            min="1"
                            value={product.quantidade}
                            onChange={(e) => updateProductQuantity(product.id, parseInt(e.target.value) || 1)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Preço Unitário</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={product.precoUnitario}
                            onChange={(e) => updateProductPrice(product.id, parseFloat(e.target.value) || 0)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Fornecedor</label>
                          <input
                            type="text"
                            value={product.fornecedor}
                            onChange={(e) => updateProductSupplier(product.id, e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Opcional"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Subtotal</label>
                          <div className="px-2 py-1 bg-gray-100 rounded text-sm font-medium">
                            R$ {product.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Total */}
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                    <div className="flex justify-between items-center font-bold text-purple-800">
                      <span>Valor Total do Projeto:</span>
                      <span>R$ {calculateTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;