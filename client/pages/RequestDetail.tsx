import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function RequestDetail() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/requests");
  };

  const handleLogout = () => {
    navigate("/");
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

      {/* Yellow Header Bar with Back Button */}
      <div className="bg-yellow-400 border-b-4 border-purple-600 px-4 py-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-purple-700 p-0 hover:bg-transparent"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <div className="font-abeezee text-purple-700 text-sm tracking-wide">
            solicitudes
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Request Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="font-roboto text-2xl font-bold text-black mb-4">
            Estado de solicitud
          </h2>
          <div className="bg-gray-200 rounded-lg h-16 flex items-center justify-center">
            <span className="text-gray-500 font-abeezee">Estado del servicio</span>
          </div>
        </div>

        {/* Service Location Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="font-roboto text-2xl font-bold text-black mb-4">
            Ubicacion del servio
          </h2>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            {/* Mock Map - In a real app, this would be an actual map component */}
            <div className="h-80 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
              {/* Mock map elements */}
              <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
              <div className="relative z-10 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-sm text-gray-600 mb-2">📍 Ubicación del servicio</div>
                <div className="text-xs text-gray-500">
                  Graphicsource C.A. Guayaquil, C. 18-A N...
                </div>
                <div className="text-xs text-blue-600 mt-1">Más opciones</div>
              </div>
              
              {/* Mock route indicator */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-2 shadow-lg">
                <div className="text-xs text-gray-600">🚗 9 min</div>
                <div className="text-xs text-gray-500">5.6 km</div>
              </div>
              
              {/* Zoom controls */}
              <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                <button className="bg-white rounded w-8 h-8 flex items-center justify-center shadow-lg text-lg">
                  +
                </button>
                <button className="bg-white rounded w-8 h-8 flex items-center justify-center shadow-lg text-lg">
                  −
                </button>
              </div>
            </div>
            
            {/* Map attribution */}
            <div className="bg-white px-2 py-1 text-xs text-gray-500 flex justify-between">
              <span>Combinaciones de teclas</span>
              <span>Datos del mapa ©2023</span>
              <span>Términos</span>
              <span>Notificar un problema de Mapa</span>
            </div>
          </div>
        </div>

        {/* Request Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="font-roboto text-2xl font-bold text-black">
            Detalles de la solicitud
          </h2>
        </div>
      </div>
    </div>
  );
}
