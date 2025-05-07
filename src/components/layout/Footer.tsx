import React from 'react';
import { Receipt } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Receipt className="h-6 w-6 text-blue-800" />
            <span className="ml-2 text-lg font-bold text-blue-800">ReciboJá</span>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Recursos</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-800">Como funciona</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-800">Modelos de recibos</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-800">Perguntas frequentes</a>
                </li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Legal</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-800">Termos de uso</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-800">Política de privacidade</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-800">Conformidade</a>
                </li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Contato</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-800">Suporte</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-800">Contato comercial</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-center text-sm text-gray-500">&copy; {currentYear} ReciboJá. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;