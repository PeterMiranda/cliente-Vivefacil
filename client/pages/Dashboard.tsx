import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu, LogOut, Home, MessageSquare, FileText, Bell, User } from "lucide-react";

const serviceCategories = [
  { id: 1, name: "Albañil", icon: "🏗️" },
  { id: 2, name: "Asistencia Mecánica", icon: "🚛" },
  { id: 3, name: "Suspensión Automotriz", icon: "🔧" },
  { id: 4, name: "Belleza", icon: "💄" },
  { id: 5, name: "Broker", icon: "💰" },
  { id: 6, name: "Cambio de Aceite", icon: "🛢️" },
  { id: 7, name: "Carpintero", icon: "🔨" },
  { id: 8, name: "Cerrajero", icon: "🔐" },
  { id: 9, name: "Climatización Vehicular", icon: "🚗" },
  { id: 10, name: "Cristalero", icon: "🪟" },
  { id: 11, name: "Decoración de hogar", icon: "🎭" },
  { id: 12, name: "Diseño de Modulares", icon: "🛋️" },
  { id: 13, name: "Domótica", icon: "🏠" },
  { id: 14, name: "Electricista", icon: "⚡" },
  { id: 15, name: "Electrodomésticos", icon: "🔌" },
  { id: 16, name: "Herrero", icon: "⚒️" },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleNavigateToRequests = () => {
    navigate("/requests");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-purple-700 text-white px-4 py-2">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-white p-2">
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex-1 flex justify-center">
            <div className="bg-purple-700 rounded-full px-8 py-2">
              <h1 className="font-knewave text-2xl text-yellow-400">
                Vive Facil!
              </h1>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="text-white p-2" onClick={handleLogout}>
            <LogOut className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Yellow Header Bar */}
      <div className="bg-yellow-400 border-b-4 border-purple-600 px-4 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="font-abeezee text-purple-700 font-bold text-sm tracking-wide">
              Nombre Apellido
            </div>
            <div className="font-abeezee text-purple-700 text-sm italic">
              Bienvenido/a
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-300 border-none rounded-lg text-gray-700 placeholder:text-gray-500 font-abeezee text-lg"
          />
        </div>
      </div>

      {/* Service Categories Grid */}
      <div className="px-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          {serviceCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center space-y-3 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <div className="text-center">
                <h3 className="font-roboto text-sm text-gray-700 font-medium leading-tight">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center space-y-1 py-2">
            <Home className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 font-roboto">Inicio</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 py-2">
            <MessageSquare className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 font-roboto">Chat</span>
          </button>
          
          <button 
            onClick={handleNavigateToRequests}
            className="flex flex-col items-center space-y-1 py-2"
          >
            <FileText className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 font-roboto">Solicitudes</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 py-2">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 font-roboto">Notificaciones</span>
          </button>
        </div>
      </div>
    </div>
  );
}
