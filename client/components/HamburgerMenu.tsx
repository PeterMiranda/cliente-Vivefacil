import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, History, Home, MessageSquare, FileText, User, Settings, LogOut, Plus } from "lucide-react";

interface HamburgerMenuProps {
  className?: string;
}

export default function HamburgerMenu({ className = "" }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    navigate("/");
    closeMenu();
  };

  return (
    <div className={className}>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-white p-2"
        onClick={toggleMenu}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="bg-purple-700 text-white p-4 flex items-center justify-between">
          <h2 className="font-knewave text-xl text-yellow-400">Vive Facil!</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white p-2"
            onClick={closeMenu}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="py-4">
          <button
            onClick={() => handleNavigate("/dashboard")}
            className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors"
          >
            <Home className="h-5 w-5 text-gray-600 mr-3" />
            <span className="font-abeezee text-gray-800">Inicio</span>
          </button>

          <button
            onClick={() => handleNavigate("/service-request")}
            className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-5 w-5 text-gray-600 mr-3" />
            <span className="font-abeezee text-gray-800">Nueva Solicitud</span>
          </button>

          <button
            onClick={() => handleNavigate("/history")}
            className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors"
          >
            <History className="h-5 w-5 text-gray-600 mr-3" />
            <span className="font-abeezee text-gray-800">Historial</span>
          </button>

          <button
            onClick={() => handleNavigate("/requests")}
            className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors"
          >
            <FileText className="h-5 w-5 text-gray-600 mr-3" />
            <span className="font-abeezee text-gray-800">Solicitudes</span>
          </button>

          <button
            onClick={() => handleNavigate("/chat")}
            className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors"
          >
            <MessageSquare className="h-5 w-5 text-gray-600 mr-3" />
            <span className="font-abeezee text-gray-800">Chat</span>
          </button>

          <div className="border-t border-gray-200 my-4"></div>

          <button
            onClick={() => handleNavigate("/profile")}
            className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors"
          >
            <User className="h-5 w-5 text-gray-600 mr-3" />
            <span className="font-abeezee text-gray-800">Perfil</span>
          </button>

          <button
            onClick={() => handleNavigate("/settings")}
            className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-5 w-5 text-gray-600 mr-3" />
            <span className="font-abeezee text-gray-800">Configuración</span>
          </button>

          <div className="border-t border-gray-200 my-4"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors text-red-600"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-abeezee">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}
