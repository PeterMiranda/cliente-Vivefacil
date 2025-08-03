import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Menu, LogOut, ChevronDown, AlertCircle, MapPin, Edit, Image, X, User } from "lucide-react";

interface HistoryRequest {
  id: string;
  status: "FINALIZADO" | "COMPLETADO" | "EN ESPERA";
  paymentMethod: "Efectivo" | "Tarjeta";
  date: string;
  time: string;
  serviceName: string;
  description: string;
  location?: string;
  referencePhoto?: string;
  providerName?: string;
}

const mockHistoryRequests: HistoryRequest[] = [
  {
    id: "1",
    status: "FINALIZADO",
    paymentMethod: "Efectivo",
    date: "2025-06-27",
    time: "23:06",
    serviceName: "Servicio de Ejemplo",
    description: "Descripción de ejemplo del servicio",
    location: "Oficina de Admisiones ESPOL",
    referencePhoto: "https://cdn.builder.io/api/v1/image/assets%2Fd0b212635db542d0a69535984d9600d8%2Fefe99d28c7c6468ba168e7d979694096?format=webp&width=800",
    providerName: "Sebastian C"
  },
];

export default function History() {
  const [activeTab, setActiveTab] = useState<"EN ESPERA" | "PASADAS">("PASADAS");
  const [sortOrder, setSortOrder] = useState<"Ascendente" | "Descendente">("Descendente");
  const [selectedRequest, setSelectedRequest] = useState<HistoryRequest | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    if (selectedRequest) {
      setSelectedRequest(null);
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleRequestClick = (request: HistoryRequest) => {
    setSelectedRequest(request);
  };

  const handleConfirmService = () => {
    setShowConfirmModal(true);
  };

  const handleRateProvider = () => {
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
    setRating(0);
    setRatingComment("");
  };

  const handleSubmitRating = () => {
    // In a real app, this would submit the rating to the backend
    console.log("Rating submitted:", { rating, comment: ratingComment });
    setShowRatingModal(false);
    setRating(0);
    setRatingComment("");
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmFinal = () => {
    setShowConfirmModal(false);
    setSelectedRequest(null);
    // In a real app, this would update the request status
  };

  const filteredRequests = mockHistoryRequests.filter(request => {
    if (activeTab === "EN ESPERA") {
      return request.status === "EN ESPERA";
    } else {
      return request.status === "FINALIZADO" || request.status === "COMPLETADO";
    }
  });

  if (selectedRequest) {
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
              Historial
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
            <div className="bg-gray-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="h-9 w-9 text-black" />
              <div className="flex-1">
                <p className="font-abeezee text-purple-700 text-sm leading-tight">
                  La solicitud se encuentra en estado finalizada. Puede confirma que el 
                  servicio se ha realizado efectivamente con el siguiente botón
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mt-6 space-y-4">
              <Button
                onClick={handleConfirmService}
                className="bg-purple-700 hover:bg-purple-800 text-white font-abeezee text-lg px-8 py-3 rounded-full shadow-lg"
              >
                Confirmar servicio
              </Button>
              <Button
                onClick={handleRateProvider}
                className="bg-purple-700 hover:bg-purple-800 text-white font-abeezee text-lg px-8 py-3 rounded-full shadow-lg"
              >
                Calificar Proveedor
              </Button>
            </div>
          </div>

          {/* Request Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="font-roboto text-2xl font-bold text-black">
              Detalles de la solicitud
            </h2>

            {/* Location */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-700" />
                <span className="font-roboto text-purple-700 font-medium">Ubicación:</span>
              </div>
              <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-abeezee text-lg py-3 rounded-lg">
                Ver en el mapa
              </Button>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Edit className="h-5 w-5 text-purple-700" />
                <span className="font-roboto text-purple-700 font-medium">Descripción:</span>
              </div>
              <p className="font-abeezee text-gray-700">{selectedRequest.description}</p>
            </div>

            {/* Reference Photo */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Image className="h-5 w-5 text-purple-700" />
                <span className="font-roboto text-purple-700 font-medium">Foto de referencia:</span>
              </div>
              {selectedRequest.referencePhoto && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={selectedRequest.referencePhoto} 
                    alt="Reference" 
                    className="w-full h-80 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center p-3 z-50">
            <div className="bg-white rounded-3xl w-full max-w-md">
              {/* Modal Header */}
              <div className="bg-purple-700 rounded-t-3xl px-6 py-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-white p-1 hover:bg-white hover:bg-opacity-20"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <h2 className="font-roboto text-2xl font-bold text-black text-center">
                  Confirmación de servicio
                </h2>

                {/* Provider Avatar */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Provider Name */}
                <div className="bg-gray-200 rounded-lg p-4 text-center">
                  <button
                    onClick={() => navigate('/provider/1')}
                    className="font-roboto text-purple-700 font-medium text-lg hover:underline"
                  >
                    {selectedRequest.providerName}
                  </button>
                </div>

                {/* Confirmation Text */}
                <div className="bg-gray-200 rounded-lg p-4">
                  <p className="font-roboto text-purple-700 text-center leading-tight">
                    ¿Está seguro de que desea confirmar que se ha realizado efectivamente el servicio?
                  </p>
                </div>

                {/* Confirm Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleConfirmFinal}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-abeezee text-lg px-8 py-3 rounded-full shadow-lg"
                  >
                    Confirmar servicio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center p-3 z-50">
            <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-purple-700 rounded-t-3xl px-6 py-4 relative">
                <h2 className="text-white font-roboto text-xl font-bold">Proveedor</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseRatingModal}
                  className="absolute top-4 right-4 text-white p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Provider Avatar */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Fd0b212635db542d0a69535984d9600d8%2F09404362ca694c2db6f113b47317a9f6?format=webp&width=800"
                      alt="Provider avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Provider Name */}
                <div className="flex items-center justify-center space-x-2">
                  <User className="h-5 w-5 text-purple-700" />
                  <span className="font-roboto text-purple-700 font-medium text-lg">
                    {selectedRequest?.providerName || "Dolores Maria Quintana M"}
                  </span>
                </div>

                {/* Rating Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-700 flex items-center justify-center">
                      <span className="text-white text-lg">★</span>
                    </div>
                    <span className="font-roboto text-purple-700 font-medium text-lg">
                      Califica el servicio
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick(star)}
                        className="transition-colors"
                      >
                        <span
                          className={`text-4xl ${
                            star <= rating ? 'text-orange-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Section */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-700 rounded flex items-center justify-center">
                      <span className="text-white text-sm">✎</span>
                    </div>
                    <span className="font-roboto text-purple-700 font-medium">
                      Descripción *:
                    </span>
                  </div>

                  <textarea
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    placeholder="Escriba su comentario aquí"
                    className="w-full h-24 bg-gray-100 border-none rounded-lg text-gray-700 placeholder:text-gray-400 font-abeezee resize-none p-3"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleSubmitRating}
                    disabled={rating === 0 || !ratingComment.trim()}
                    className="bg-purple-700 hover:bg-purple-800 disabled:bg-gray-400 text-white font-abeezee text-lg px-12 py-3 rounded-full shadow-lg"
                  >
                    Enviar Calificación
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

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
            Historial
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("EN ESPERA")}
            className={`flex-1 py-3 px-4 font-abeezee text-sm tracking-wide ${
              activeTab === "EN ESPERA"
                ? "text-purple-700 bg-white border-b-2 border-purple-700"
                : "text-purple-700"
            }`}
          >
            EN ESPERA
          </button>
          <button
            onClick={() => setActiveTab("PASADAS")}
            className={`flex-1 py-3 px-4 font-abeezee text-sm tracking-wide ${
              activeTab === "PASADAS"
                ? "text-purple-700 bg-white border-b-2 border-purple-700"
                : "text-purple-700"
            }`}
          >
            PASADAS
          </button>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="bg-white shadow-lg px-4 py-3 flex justify-between items-center">
        <div className="font-abeezee text-black text-sm tracking-wide">
          Orden
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === "Ascendente" ? "Descendente" : "Ascendente")}
          className="flex items-center space-x-2 font-abeezee text-black text-sm tracking-wide"
        >
          <span>{sortOrder}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* History List */}
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
              onClick={() => handleRequestClick(request)}
              className="bg-yellow-400 rounded-3xl p-1 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="bg-purple-700 rounded-3xl p-4 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="font-abeezee text-sm tracking-wide">
                      Solicitud
                    </div>
                    <div className="font-abeezee text-sm tracking-wide font-bold">
                      {request.status}
                    </div>
                    <div className="font-abeezee text-sm tracking-wide">
                      {request.paymentMethod}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-abeezee text-sm">
                      {request.date}
                    </div>
                    <div className="font-abeezee text-sm">
                      {request.time}
                    </div>
                    <div className="font-abeezee text-sm">
                      {request.serviceName}
                    </div>
                  </div>
                </div>
                <div className="border-t border-white pt-3">
                  <div className="font-abeezee text-sm tracking-wide">
                    {request.description}
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
