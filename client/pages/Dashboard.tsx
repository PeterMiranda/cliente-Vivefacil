import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  LogOut,
  Home,
  MessageSquare,
  FileText,
  Bell,
  User,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";

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
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [activeRequest, setActiveRequest] = useState({
    id: "1",
    providerName: "Sebastian Ceballos",
    status: "Solicitud Asignada",
    statusDetail: "Standby",
    paymentMethod: "Efectivo",
    date: "2025-06-27",
    time: "14:30",
    serviceName: "Servicio de Ejemplo",
    description: "Descripción de ejemplo del servicio",
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleNavigateToRequests = () => {
    navigate("/requests");
  };

  const handleNavigateToChat = () => {
    navigate("/chat");
  };

  const handleServiceClick = (serviceName: string) => {
    navigate(`/service-request/${encodeURIComponent(serviceName)}`);
  };

  const handleOptionsClick = () => {
    setShowOptionsModal(true);
  };

  const handleChangeProvider = () => {
    setShowOptionsModal(false);
    setShowProviderModal(true);
  };

  const handleCancelRequest = () => {
    setShowOptionsModal(false);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    // In real app, cancel the request
    console.log("Canceling request with reason:", cancelReason);
    setShowCancelModal(false);
    setCancelReason("");
    // Remove active request or update status
  };

  const handleProviderChange = (newProviderName: string) => {
    setActiveRequest((prev) => ({
      ...prev,
      providerName: newProviderName,
      time: "15:30", // Update time as shown in Figma
    }));
    setShowProviderModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-purple-700 text-white px-4 py-2">
        <div className="flex items-center justify-between">
          <HamburgerMenu />

          <div className="flex-1 flex justify-center">
            <div className="bg-purple-700 rounded-full px-8 py-2">
              <h1 className="font-knewave text-2xl text-yellow-400">
                Vive Facil!
              </h1>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-white p-2"
            onClick={handleLogout}
          >
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
      <div className="px-4 pb-48">
        <div className="grid grid-cols-2 gap-4">
          {serviceCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleServiceClick(category.name)}
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

      {/* Active Request */}
      {activeRequest && (
        <div className="fixed bottom-16 left-0 right-0 px-0">
          <div className="bg-purple-700 rounded-t-3xl px-4 py-4 text-white">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/45251e0596b81ea84707bce2e1d590c896fb87f6?width=104"
                  alt="Provider"
                  className="w-12 h-12 rounded-full"
                />
                <div className="space-y-1">
                  <div className="font-abeezee text-sm tracking-wide leading-tight">
                    {activeRequest.status}
                  </div>
                  <div className="font-abeezee text-sm tracking-wide leading-tight">
                    {activeRequest.statusDetail}
                  </div>
                  <div className="font-abeezee text-sm tracking-wide leading-tight">
                    {activeRequest.paymentMethod}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-right space-y-1">
                  <div className="font-abeezee text-sm leading-tight">
                    {activeRequest.date}
                  </div>
                  <div className="font-abeezee text-sm leading-tight">
                    {activeRequest.time}
                  </div>
                  <div className="font-abeezee text-sm leading-tight">
                    {activeRequest.serviceName}
                  </div>
                </div>
                <button onClick={handleOptionsClick} className="p-2">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/27d1b7be3c0de58cce7d129ffeac7600379636a2?width=94"
                    alt="Options"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
            <div className="border-t border-white pt-3 mb-3">
              <div className="font-abeezee text-sm tracking-wide leading-tight">
                {activeRequest.providerName}
              </div>
            </div>
            <div className="font-abeezee text-sm tracking-wide leading-tight">
              {activeRequest.description}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center space-y-1 py-2">
            <Home className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 font-roboto">Inicio</span>
          </button>

          <button
            onClick={handleNavigateToChat}
            className="flex flex-col items-center space-y-1 py-2"
          >
            <MessageSquare className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 font-roboto">Chat</span>
          </button>

          <button
            onClick={handleNavigateToRequests}
            className="flex flex-col items-center space-y-1 py-2"
          >
            <FileText className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 font-roboto">
              Solicitudes
            </span>
          </button>

          <button className="flex flex-col items-center space-y-1 py-2">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 font-roboto">
              Notificaciones
            </span>
          </button>
        </div>
      </div>

      {/* Options Modal */}
      {showOptionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-200 rounded-3xl w-full max-w-sm border border-black">
            <div className="p-6 space-y-6 relative">
              <button
                onClick={() => setShowOptionsModal(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-red-900 rounded-full flex items-center justify-center"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              <h2 className="font-roboto text-3xl font-normal text-purple-700 text-center mt-2">
                Opciones
              </h2>

              <div className="space-y-4">
                <button
                  onClick={handleChangeProvider}
                  className="w-full bg-yellow-400 rounded-xl py-4 px-6 shadow-lg"
                >
                  <span className="font-abeezee text-2xl text-black tracking-wide">
                    Cambiar Proveedor
                  </span>
                </button>

                <button
                  onClick={handleCancelRequest}
                  className="w-full bg-red-900 rounded-xl py-4 px-6 shadow-lg"
                >
                  <span className="font-abeezee text-2xl text-white tracking-wide">
                    Cancelar Solicitud
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-200 rounded-3xl w-full max-w-sm border border-black">
            <div className="p-6 space-y-6 relative">
              <button
                onClick={() => setShowCancelModal(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-red-900 rounded-full flex items-center justify-center"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              <h2 className="font-roboto text-3xl font-normal text-purple-700 text-center mt-2">
                ¿Seguro?
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="font-abeezee text-purple-700 text-base tracking-wide">
                    Motivo:
                  </label>
                  <Textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full mt-2 h-20 bg-white border-none rounded-lg"
                    placeholder="Ingrese el motivo..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleConfirmCancel}
                    className="flex-1 bg-green-500 rounded-xl py-4 shadow-lg"
                  >
                    <span className="font-abeezee text-2xl text-white tracking-wide">
                      Confirmar
                    </span>
                  </button>

                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 bg-red-900 rounded-xl py-4 shadow-lg"
                  >
                    <span className="font-abeezee text-2xl text-white tracking-wide">
                      Cancelar
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Provider Selection Modal */}
      {showProviderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="bg-purple-700 rounded-t-3xl px-6 py-4 relative">
              <h2 className="text-white font-roboto text-xl font-bold">
                Cambiar Proveedor
              </h2>
              <button
                onClick={() => setShowProviderModal(false)}
                className="absolute top-4 right-4 text-white p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                <button
                  onClick={() => handleProviderChange("Roberto Barrios")}
                  className="w-full bg-purple-700 rounded-lg p-4 text-white hover:bg-purple-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-purple-700" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-abeezee text-sm font-medium">
                        Roberto Barrios
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-white text-sm mr-1">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="font-abeezee text-xs mt-1">
                        <span className="font-bold">Ciudad:</span> Guayaquil
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleProviderChange("Maria Rodriguez")}
                  className="w-full bg-purple-700 rounded-lg p-4 text-white hover:bg-purple-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-purple-700" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-abeezee text-sm font-medium">
                        Maria Rodriguez
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-white text-sm mr-1">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="font-abeezee text-xs mt-1">
                        <span className="font-bold">Ciudad:</span> Guayaquil
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
