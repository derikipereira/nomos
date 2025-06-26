import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Receipt, FileText, Users, Banknote, Plus } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  cpf: string;
  created_at: string;
}

interface Receipt {
  id: string;
  value: number;
  description: string;
  service_type: string;
  date: string; 
  customer: { 
    name: string;
  };
}

interface DashboardStats {
  periodReceiptsCount: number;
  totalReceipts: number;
  periodRevenue: number;
  totalRevenue: number;
  totalClients: number;
  newClientsInPeriod: number;
}


const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};


const Dashboard: React.FC = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [clients, setClients] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = Cookies.get('auth_token');
        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        const headers = { Authorization: `Bearer ${token}` };
        
        const receiptsPromise = axios.get('http://localhost:3000/receipts', { headers });
        const clientsPromise = axios.get('http://localhost:3000/customers', { headers });

        const [receiptsResponse, clientsResponse] = await Promise.all([
          receiptsPromise,
          clientsPromise
        ]);

        setReceipts(receiptsResponse.data);
        setClients(clientsResponse.data);
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 


  const dashboardStats: DashboardStats = useMemo(() => {
    const now = new Date();
    let startDate = new Date();

    if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    const periodReceipts = receipts.filter(r => new Date(r.date) >= startDate);
    const newClientsInPeriod = clients.filter(c => new Date(c.created_at) >= startDate);

    return {
      periodReceiptsCount: periodReceipts.length,
      totalReceipts: receipts.length,
      periodRevenue: periodReceipts.reduce((sum, r) => sum + r.value, 0),
      totalRevenue: receipts.reduce((sum, r) => sum + r.value, 0),
      totalClients: clients.length,
      newClientsInPeriod: newClientsInPeriod.length,
    };
  }, [receipts, clients, period]);


  const recentReceipts = useMemo(() => {
    return [...receipts] 
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5); 
  }, [receipts]);

  const periodLabels = {
    week: 'Esta Semana',
    month: 'Este Mês',
    year: 'Este Ano',
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {(Object.keys(periodLabels) as Array<keyof typeof periodLabels>).map((p) => (
                <button 
                  key={p}
                  className={`px-4 py-2 text-sm rounded-lg ${
                    period === p ? 'bg-blue-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setPeriod(p)}
                >
                  {periodLabels[p]}
                </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <Receipt className="h-6 w-6 text-blue-800" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Recibos de {periodLabels[period].toLowerCase().replace('este ', '')}</p>
              <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.periodReceiptsCount}</h3>
              <p className="text-xs text-gray-500">{dashboardStats.totalReceipts} recibos totais</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <Banknote className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Receita de {periodLabels[period].toLowerCase().replace('este ', '')}</p>
              <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardStats.periodRevenue)}</h3>
              <p className="text-xs text-gray-500">{formatCurrency(dashboardStats.totalRevenue)} de receita total</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Clientes</p>
              <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.totalClients}</h3>
              <p className="text-xs text-gray-500">+{dashboardStats.newClientsInPeriod} novos {period === 'month' ? 'este mês' : (period === 'year' ? 'este ano' : 'esta semana')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recibos Recentes</h2>
                <Link to="/historico" className="text-blue-800 hover:text-blue-600 text-sm font-medium">
                  Ver todos
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                {recentReceipts.length > 0 ? (
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentReceipts.map((receipt) => (
                        <tr key={receipt.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.customer.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.service_type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(receipt.value)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(receipt.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Nenhum recibo encontrado.
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Link 
                  to="/novo-recibo" 
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Novo Recibo
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
              <div className="space-y-3">
                <Link 
                  to="/novo-recibo" 
                  className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="bg-blue-800 rounded-full p-2 mr-3">
                    <Receipt className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Criar Novo Recibo</span>
                </Link>
                
                <Link 
                  to="/historico" 
                  className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="bg-purple-700 rounded-full p-2 mr-3">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Ver Todos os Recibos</span>
                </Link>
                
                <Link 
                  to="/clientes" 
                  className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="bg-green-700 rounded-full p-2 mr-3">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Gerenciar Clientes</span>
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-lg shadow-sm p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">💡 Dicas Rápidas</h2>
              <ul className="space-y-2 text-sm">
                 <li className="flex items-start">
                  <span className="flex-shrink-0 text-lg mr-2">•</span>
                  <span>Mantenha dados do cliente sempre atualizados para criar recibos mais rapidamente.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-lg mr-2">•</span>
                  <span>Envie recibos por e-mail no mesmo dia do serviço para melhor organização financeira.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-lg mr-2">•</span>
                  <span>Mantenha um histórico mensal para facilitar a declaração de imposto de renda.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;