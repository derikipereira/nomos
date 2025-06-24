import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Briefcase,
  FileText,
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Briefcase className="h-8 w-8 text-purple-800" />
              <span className="ml-2 text-xl font-bold text-purple-800">
                Nomos
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/sobre"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive("/sobre")
                      ? "bg-purple-800 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-purple-800"
                  }`}
                >
                  Sobre
                </Link>
                <Link
                  to="/contato"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive("/contato")
                      ? "bg-purple-800 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-purple-800"
                  }`}
                >
                  Contato
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-purple-800 hover:bg-purple-300 rounded-md"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-800 hover:bg-purple-900 rounded-md"
                >
                  Começar Grátis
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive("/dashboard")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/novo-recibo"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive("/novo-recibo")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  Novo Recibo
                </Link>
                <Link
                  to="/historico"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive("/historico")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  Histórico
                </Link>
                <Link
                  to="/perfil"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive("/perfil")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  Perfil
                </Link>
                <button className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200">
                  <span className="flex items-center">
                    <LogOut className="h-4 w-4 mr-1" />
                    Sair
                  </span>
                </button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/sobre"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/sobre")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={closeMenu}
                >
                  Sobre
                </Link>
                <Link
                  to="/recibo-gratis"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/recibo-gratis")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={closeMenu}
                >
                  Recibo Grátis
                </Link>
                <Link
                  to="/precos"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/precos")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={closeMenu}
                >
                  Preços
                </Link>
                <Link
                  to="/contato"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/contato")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={closeMenu}
                >
                  Contato
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                    onClick={closeMenu}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/cadastro"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 mt-2"
                    onClick={closeMenu}
                  >
                    Começar Grátis
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/dashboard")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <LayoutDashboard className="h-5 w-5 mr-2" />
                    Dashboard
                  </span>
                </Link>
                <Link
                  to="/novo-recibo"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/novo-recibo")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Novo Recibo
                  </span>
                </Link>
                <Link
                  to="/historico"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/historico")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Histórico
                  </span>
                </Link>
                <Link
                  to="/perfil"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/perfil")
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Perfil
                  </span>
                </Link>
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-700"
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Sair
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
