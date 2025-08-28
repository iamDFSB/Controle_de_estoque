import React, { useState } from 'react';
import React, { useState } from 'react';
import { X } from 'lucide-react';

const SimpleProposalModal = ({ isOpen, onClose, onSubmit, onError }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    empresa: {
      nome: '',
      cnpj: '',
      contato: ''
    },
    dataInicio: new Date().toISOString().split('T')[0],
    dataFim: '',
    responsavel: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nome.trim()) {
      onError && onError('Nome da proposta é obrigatório');
      return;
    }
    
    if (!formData.empresa.nome.trim()) {
      onError && onError('Nome da empresa é obrigatório');
      return;
    }
    
    if (!formData.responsavel.trim()) {
      onError && onError('Responsável é obrigatório');
      return;
    }

    const projectData = {
      ...formData,
      produtos: [], // Start with empty products
      valorTotal: 0, // Start with zero value
      status: 'Proposta Comercial'
    };

    console.log('Submitting project data:', projectData);
    onSubmit(projectData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nome: '',
      descricao: '',
      empresa: { nome: '', cnpj: '', contato: '' },
      dataInicio: new Date().toISOString().split('T')[0],
      dataFim: '',
      responsavel: ''
    });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Criar Nova Proposta Comercial</h2>
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
                Nome da Proposta *
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
                Responsável pela Proposta *
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

          {/* Note about products */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> A proposta será criada sem produtos inicialmente. 
              Você poderá adicionar produtos posteriormente através da edição.
            </p>
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
              Criar Proposta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleProposalModal;