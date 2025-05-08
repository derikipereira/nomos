import React, { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { LayoutGrid, FileText, Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppBarProps {
  title?: string;
}

const AppBar: React.FC<AppBarProps> = ({ title = "Dashboard" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Recibos", href: "/historico" },
    { icon: Users, label: "Clientes", href: "#" },
    { icon: Settings, label: "Configurações", href: "#" },
  ];

  return (
    <>
      <Collapsible.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        } z-20`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Collapsible.Trigger asChild>
              <button>
                <LayoutGrid className="h-6 w-6 text-blue-600 flex-shrink-0" />
              </button>
            </Collapsible.Trigger>
            <span
              className={`font-semibold transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              NOMOS
            </span>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 group"
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={`transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 w-full"
            onClick={() => navigate("/")}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Sair
            </span>
          </button>
        </div>
      </Collapsible.Root>

      <header
        className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 transition-all duration-300 ${
          isOpen ? "left-64" : "left-20"
        } z-10`}
      >
        <span className="text-xl font-semibold text-gray-900">{title}</span>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <button className="rounded-full bg-gray-200 p-2">
              <span className="text-sm font-medium">AS</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppBar;
