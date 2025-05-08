import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Receipt, FileText, TrendingUp, Users, Calendar, Banknote, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [period, setPeriod] = useState('month');

  const stats = {
    totalReceipts: 24,
    monthlyReceipts: 6,
    totalRevenue: 'R$ 7.650,00',
    monthlyRevenue: 'R$ 2.350,00',
    clients: 8,
    pendingReceipts: 2
  };

  const recentReceipts = [
    { id: 1, client: 'Empresa ABC Ltda.', service: 'Consultoria Marketing Digital', value: 'R$ 950,00', date: '25/05/2025', status: 'sent' },
    { id: 2, client: 'João Silva', service: 'Desenvolvimento Website', value: 'R$ 1.500,00', date: '20/05/2025', status: 'downloaded' },
    { id: 3, client: 'Maria Oliveira', service: 'Design de Logo', value: 'R$ 450,00', date: '18/05/2025', status: 'viewed' },
    { id: 4, client: 'Carlos Ferreira', service: 'Edição de Vídeo', value: 'R$ 650,00', date: '12/05/2025', status: 'sent' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${
                period === 'week' ? 'bg-blue-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setPeriod('week')}
            >
              Esta Semana
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${
                period === 'month' ? 'bg-blue-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setPeriod('month')}
            >
              Este Mês
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-lg ${
                period === 'year' ? 'bg-blue-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setPeriod('year')}
            >
              Este Ano
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <Receipt className="h-6 w-6 text-blue-800" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Recibos</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalReceipts}</h3>
              <p className="text-xs text-gray-500">+{stats.monthlyReceipts} este mês</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <Banknote className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Receita Total</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</h3>
              <p className="text-xs text-gray-500">{stats.monthlyRevenue} este mês</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Clientes</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.clients}</h3>
              <p className="text-xs text-gray-500">+2 novos este mês</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="bg-yellow-100 rounded-full p-3 mr-4">
              <Calendar className="h-6 w-6 text-yellow-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Recibos Pendentes</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.pendingReceipts}</h3>
              <p className="text-xs text-gray-500">Aguardando envio</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recibos Recentes</h2>
                <Link 
                  to="/historico" 
                  className="text-blue-800 hover:text-blue-600 text-sm font-medium"
                >
                  Ver todos
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentReceipts.map((receipt) => (
                      <tr key={receipt.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.client}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.value}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {receipt.status === 'sent' && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Enviado
                            </span>
                          )}
                          {receipt.status === 'viewed' && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Visualizado
                            </span>
                          )}
                          {receipt.status === 'downloaded' && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              Baixado
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  to="/perfil" 
                  className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="bg-green-700 rounded-full p-2 mr-3">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Gerenciar Clientes</span>
                </Link>
                
                <Link 
                  to="/perfil" 
                  className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <div className="bg-yellow-500 rounded-full p-2 mr-3">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Relatório Financeiro</span>
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