import React, { useState } from 'react';
import { Search, Filter, FileText, Download, Printer, Eye, Trash2, ChevronsUpDown } from 'lucide-react';

const ReceiptHistory: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    period: 'all',
    status: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'}>({
    key: 'date',
    direction: 'desc'
  });

  
  const receiptData = [
    { id: 1, client: 'Empresa ABC Ltda.', service: 'Consultoria Marketing Digital', value: 'R$ 950,00', date: '25/05/2025', status: 'pending' },
    { id: 2, client: 'João Silva', service: 'Desenvolvimento Website', value: 'R$ 1.500,00', date: '20/05/2025', status: 'finished' },
    { id: 3, client: 'Maria Oliveira', service: 'Design de Logo', value: 'R$ 450,00', date: '18/05/2025', status: 'finished' },
    { id: 4, client: 'Carlos Ferreira', service: 'Edição de Vídeo', value: 'R$ 650,00', date: '12/05/2025', status: 'pending' },
    { id: 5, client: 'Renata Souza', service: 'Consultoria SEO', value: 'R$ 800,00', date: '05/05/2025', status: 'finished' },
    { id: 6, client: 'Fernando Almeida', service: 'Desenvolvimento Mobile App', value: 'R$ 3.500,00', date: '30/04/2025', status: 'pending' },
    { id: 7, client: 'Ana Beatriz', service: 'Treinamento Excel', value: 'R$ 350,00', date: '25/04/2025', status: 'finished' },
    { id: 8, client: 'Marcos Santos', service: 'Consultoria Financeira', value: 'R$ 1.200,00', date: '20/04/2025', status: 'finished' },
    { id: 9, client: 'Luciana Costa', service: 'Social Media Management', value: 'R$ 600,00', date: '15/04/2025', status: 'pending' },
    { id: 10, client: 'Roberto Martins', service: 'Criação de Conteúdo', value: 'R$ 550,00', date: '10/04/2025', status: 'finished' },
  ];

  const filteredReceipts = receiptData.filter(receipt => {
    if (selectedFilters.period === 'month') {
      const currentMonth = new Date().getMonth();
      const receiptMonth = parseInt(receipt.date.split('/')[1]) - 1;
      if (receiptMonth !== currentMonth) return false;
    } else if (selectedFilters.period === 'year') {
      const currentYear = new Date().getFullYear();
      const receiptYear = parseInt(receipt.date.split('/')[2]);
      if (receiptYear !== currentYear) return false;
    }
    
    if (selectedFilters.status !== 'all' && receipt.status !== selectedFilters.status) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        receipt.client.toLowerCase().includes(query) ||
        receipt.service.toLowerCase().includes(query) ||
        receipt.value.toLowerCase().includes(query) ||
        receipt.date.includes(query)
      );
    }
    
    return true;
  });
  
  const sortedReceipts = [...filteredReceipts].sort((a, b) => {
    if (sortConfig.key === 'date') {
      const dateA = a.date.split('/').reverse().join('');
      const dateB = b.date.split('/').reverse().join('');
      return sortConfig.direction === 'asc' 
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    } else if (sortConfig.key === 'value') {
      const valueA = parseFloat(a.value.replace('R$ ', '').replace('.', '').replace(',', '.'));
      const valueB = parseFloat(b.value.replace('R$ ', '').replace('.', '').replace(',', '.'));
      return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
    } else {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      return sortConfig.direction === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    }
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (filter: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' };
      case 'finished':
        return { label: 'Finalizado', className: 'bg-green-100 text-green-800' };
      default:
        return { label: 'Desconhecido', className: 'bg-gray-100 text-gray-800' };
    }
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Histórico de Recibos</h1>
          <div className="mt-4 md:mt-0">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Buscar por cliente, serviço..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700 text-sm font-medium">Filtros:</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
                value={selectedFilters.period}
                onChange={(e) => handleFilterChange('period', e.target.value)}
              >
                <option value="all">Todos os Períodos</option>
                <option value="month">Este Mês</option>
                <option value="year">Este Ano</option>
              </select>
              
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
                value={selectedFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">Todos os Status</option>
                <option value="sent">Enviado</option>
                <option value="viewed">Visualizado</option>
                <option value="downloaded">Baixado</option>
                <option value="paid">Pago</option>
              </select>
            </div>
            
            <div className="ml-auto text-sm text-gray-500">
              Mostrando {sortedReceipts.length} de {receiptData.length} recibos
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('client')}
                  >
                    <div className="flex items-center">
                      Cliente {getSortIcon('client')}
                      {sortConfig.key === 'client' && (
                        <ChevronsUpDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('service')}
                  >
                    <div className="flex items-center">
                      Serviço {getSortIcon('service')}
                      {sortConfig.key === 'service' && (
                        <ChevronsUpDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('value')}
                  >
                    <div className="flex items-center">
                      Valor {getSortIcon('value')}
                      {sortConfig.key === 'value' && (
                        <ChevronsUpDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Data {getSortIcon('date')}
                      {sortConfig.key === 'date' && (
                        <ChevronsUpDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status {getSortIcon('status')}
                      {sortConfig.key === 'status' && (
                        <ChevronsUpDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedReceipts.map((receipt) => {
                  const status = getStatusLabel(receipt.status);
                  
                  return (
                    <tr key={receipt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.value}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-gray-600 hover:text-blue-800" title="Visualizar">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="text-gray-600 hover:text-blue-800" title="Baixar">
                            <Download className="h-5 w-5" />
                          </button>
                          <button className="text-gray-600 hover:text-blue-800" title="Imprimir">
                            <Printer className="h-5 w-5" />
                          </button>
                          <button className="text-gray-600 hover:text-red-600" title="Excluir">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                
                {sortedReceipts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 mb-1">Nenhum recibo encontrado</p>
                      <p className="text-sm text-gray-400">Tente mudar os filtros ou criar um novo recibo</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {sortedReceipts.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center sm:text-right">
              <button
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700"
              >
                Gerar Relatório
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptHistory;