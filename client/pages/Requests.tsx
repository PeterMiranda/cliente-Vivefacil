import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut, ChevronDown } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";

interface RequestItem {
  id: string;
  status: "Solicitud Asignada" | "COMPLETADO" | "PENDIENTE";
  statusDetail: "EN CAMINO" | "FINALIZADO" | "PENDIENTE";
  paymentMethod: "Efectivo" | "Tarjeta";
  date: string;
  time: string;
  serviceName: string;
  description: string;
  isPaid: boolean;
}

const mockRequests: RequestItem[] = [
  {
    id: "1",
    status: "Solicitud Asignada",
    statusDetail: "EN CAMINO",
    paymentMethod: "Efectivo",
    date: "2025-06-27",
    time: "23:06",
    serviceName: "Ayuda Universitaria",
    description: "Descripción de ejemplo del servicio",
    isPaid: false,
  },
];

export default function Requests() {
  const [activeTab, setActiveTab] = useState<"PAGADAS" | "NO PAGADAS">(
    "NO PAGADAS",
  );
  const [sortOrder, setSortOrder] = useState<"Ascendente" | "Descendente">(
    "Descendente",
  );
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleRequestClick = (requestId: string) => {
    navigate(`/request/${requestId}`);
  };

  const filteredRequests = mockRequests.filter((request) =>
    activeTab === "PAGADAS" ? request.isPaid : !request.isPaid,
  );

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

      {/* Tabs */}
      <div className="bg-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("PAGADAS")}
            className={`flex-1 py-3 px-4 font-abeezee text-sm tracking-wide ${
              activeTab === "PAGADAS"
                ? "text-purple-700 bg-white border-b-2 border-purple-700"
                : "text-purple-700"
            }`}
          >
            PAGADAS
          </button>
          <button
            onClick={() => setActiveTab("NO PAGADAS")}
            className={`flex-1 py-3 px-4 font-abeezee text-sm tracking-wide ${
              activeTab === "NO PAGADAS"
                ? "text-purple-700 bg-white border-b-2 border-purple-700"
                : "text-purple-700"
            }`}
          >
            NO PAGADAS
          </button>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="bg-white shadow-lg px-4 py-3 flex justify-between items-center">
        <div className="font-abeezee text-black text-sm tracking-wide">
          Orden
        </div>
        <button
          onClick={() =>
            setSortOrder(
              sortOrder === "Ascendente" ? "Descendente" : "Ascendente",
            )
          }
          className="flex items-center space-x-2 font-abeezee text-black text-sm tracking-wide"
        >
          <span>{sortOrder}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Requests List */}
      <div className="px-4 py-6 space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 font-abeezee">
              No hay solicitudes {activeTab.toLowerCase()}
            </p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request.id}
              onClick={() => handleRequestClick(request.id)}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              {/* Purple outer border */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-4 shadow-md">
                {/* Inner purple card */}
                <div className="bg-purple-700 rounded-3xl p-4 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <div className="font-abeezee text-sm tracking-wide leading-tight">
                        {request.status}
                      </div>
                      <div className="font-abeezee text-sm tracking-wide leading-tight">
                        {request.statusDetail}
                      </div>
                      <div className="font-abeezee text-sm tracking-wide leading-tight">
                        {request.paymentMethod}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-abeezee text-sm leading-tight">
                        {request.date}
                      </div>
                      <div className="font-abeezee text-sm leading-tight">
                        {request.time}
                      </div>
                      <div className="font-abeezee text-sm leading-tight">
                        {request.serviceName}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white pt-3">
                    <div className="font-abeezee text-sm tracking-wide leading-tight">
                      {request.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
