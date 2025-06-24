import React, { useState, useEffect, useMemo } from 'react';
import { Search, UserPlus, Edit, Trash2, ChevronsUpDown, User, X } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Client {
  id: string;
  name: string;
  cpf: string;
  createdAt: string;
}

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Partial<Client>) => void;
  client: Partial<Client> | null;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSave, client }) => {
  const [formData, setFormData] = useState({ name: '', cpf: '' });
  const [errors, setErrors] = useState({ name: '', cpf: '' });

  useEffect(() => {
    if (client && client.id) {
      setFormData({ name: client.name || '', cpf: client.cpf || '' });
    } else {
      setFormData({ name: '', cpf: '' });
    }
    setErrors({ name: '', cpf: '' });
  }, [client, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = { name: '', cpf: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório.';
      isValid = false;
    }
    if (!/^\d{11}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF inválido. Deve conter 11 dígitos.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...client, ...formData });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{client?.id ? 'Editar Cliente' : 'Adicionar Novo Cliente'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
              placeholder="Ex: João da Silva"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errors.cpf ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
              placeholder="Apenas números"
              maxLength={11}
            />
            {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Client, direction: 'asc' | 'desc' }>({
    key: 'createdAt',
    direction: 'desc'
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Partial<Client> | null>(null);

  const API_URL = 'http://localhost:3000/customers';

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('auth_token');
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const formattedClients = response.data.map((c: Client) => ({
        ...c,
        createdAt: new Date(c.createdAt).toLocaleDateString('pt-BR')
      }));
      setClients(formattedClients);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const sortedAndFilteredClients = useMemo(() => {
    let filtered = clients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.cpf.includes(searchQuery)
    );

    return [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [clients, searchQuery, sortConfig]);

  const handleSort = (key: keyof Client) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  const handleOpenModal = (client: Partial<Client> | null = null) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleSaveClient = async (clientData: Partial<Client>) => {
    const token = Cookies.get('auth_token');
    const headers = { Authorization: `Bearer ${token}` };
    const data = { name: clientData.name, cpf: clientData.cpf };

    try {
        if (clientData.id) {
            await axios.put(`${API_URL}/${clientData.id}`, data, { headers });
        } else {
            await axios.post(API_URL, data, { headers });
        }
        fetchClients();
        handleCloseModal();
    } catch(error) {
        console.error("Erro ao salvar cliente:", error);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    if(window.confirm("Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.")){
        try {
            const token = Cookies.get('auth_token');
            await axios.delete(`${API_URL}/${clientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchClients(); // Re-busca os clientes
        } catch(error) {
            console.error("Erro ao excluir cliente:", error);
        }
    }
  };

  const getSortIcon = (key: keyof Client) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="h-4 w-4 ml-1 text-gray-400" />;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <>
      <ClientModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveClient}
        client={editingClient}
      />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Meus Clientes</h1>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Buscar por nome ou CPF..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors"
              >
                <UserPlus size={18} />
                Novo Cliente
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center">Nome {getSortIcon('name')}</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('cpf')}>
                      <div className="flex items-center">CPF {getSortIcon('cpf')}</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('createdAt')}>
                      <div className="flex items-center">Data de Cadastro {getSortIcon('createdAt')}</div>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-gray-500">Carregando clientes...</td>
                    </tr>
                  ) : sortedAndFilteredClients.length > 0 ? (
                    sortedAndFilteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.cpf}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <button onClick={() => handleOpenModal(client)} className="text-gray-500 hover:text-blue-600" title="Editar">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDeleteClient(client.id)} className="text-gray-500 hover:text-red-600" title="Excluir">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-10">
                        <User className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-500 mb-1">Nenhum cliente encontrado.</p>
                        <p className="text-sm text-gray-400">Clique em "Novo Cliente" para começar.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientsPage;
