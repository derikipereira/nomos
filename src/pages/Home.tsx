import React from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Shield, Clock, FileCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Gerencie seu trabalho de forma simples e profissional
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Organize suas finanças, crie recibos digitais, acompanhe clientes e otimize sua rotina como profissional autônomo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/novo-recibo" 
                  className="px-6 py-3 bg-yellow-500 text-blue-900 font-medium rounded-lg transition-transform hover:scale-105 text-center"
                >
                  Começar Agora
                </Link>
                <Link
                  to="/dashboard" 
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/20 text-center"
                >
                  Acessar Dashboard
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-yellow-400 rounded-lg blur-sm opacity-30 animate-pulse"></div>
                <div className="relative bg-white p-4 rounded-lg shadow-xl">
                  <div className="border-b border-gray-200 pb-2 mb-4">
                    <h3 className="text-lg font-semibold text-blue-800">SISTEMA DE GESTÃO</h3>
                  </div>
                  <div className="space-y-3 text-gray-800">
                    <p className="text-sm">
                      <span className="font-medium">Profissional:</span> Ana Silva
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Serviço:</span> Consultoria Marketing Digital
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Cliente:</span> Empresa ABC Ltda.
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span> Concluído
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Data:</span> 25/05/2025
                    </p>
                  </div>
                  <div className="mt-4 border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <div className="text-blue-800 text-sm">nomos.com.br</div>
                      <div className="text-green-600 text-sm font-medium">
                        ✓ Organizado
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tudo o que você precisa para gerenciar seu trabalho</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              O Nomos é mais do que um gerador de recibos. Ele é uma solução completa para ajudar profissionais autônomos a organizar suas finanças, clientes e serviços.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl transition-transform hover:scale-105">
              <div className="bg-blue-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Agilidade</h3>
              <p className="text-gray-600">
                Economize tempo com ferramentas que simplificam a criação de recibos e a gestão de tarefas.
              </p>
            </div>
            
            <div className="bg-teal-50 p-6 rounded-xl transition-transform hover:scale-105">
              <div className="bg-teal-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Segurança</h3>
              <p className="text-gray-600">
                Seus dados e informações financeiras protegidos com tecnologia de ponta.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-xl transition-transform hover:scale-105">
              <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Organização</h3>
              <p className="text-gray-600">
                Mantenha tudo em um só lugar: recibos, clientes, serviços e histórico de pagamentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Funciona</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Três passos simples para gerenciar seu trabalho de forma eficiente
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute top-0 left-0 -ml-4 mt-2 md:ml-0 md:mt-0 w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div className="bg-white p-6 pt-12 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cadastre suas informações</h3>
                <p className="text-gray-600">
                  Insira seus dados profissionais e configure seu perfil para começar.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-0 -ml-4 mt-2 md:ml-0 md:mt-0 w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div className="bg-white p-6 pt-12 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Gerencie seus serviços</h3>
                <p className="text-gray-600">
                  Adicione detalhes de clientes, serviços e pagamentos de forma prática.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-0 -ml-4 mt-2 md:ml-0 md:mt-0 w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div className="bg-white p-6 pt-12 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Acompanhe tudo</h3>
                <p className="text-gray-600">
                  Tenha controle total sobre seus recibos, histórico de clientes e relatórios.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/novo-recibo" 
              className="px-6 py-3 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-700 inline-flex items-center"
            >
              <Receipt className="h-5 w-5 mr-2" />
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Transforme sua rotina profissional</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Experimente o Nomos e veja como é fácil gerenciar seu trabalho e impressionar seus clientes.
          </p>
          <Link 
            to="/novo-recibo" 
            className="px-8 py-4 bg-yellow-500 text-blue-900 font-medium rounded-lg text-lg transition-transform hover:scale-105 inline-block"
          >
            Começar Agora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
