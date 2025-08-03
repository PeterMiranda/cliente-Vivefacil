import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, LogOut, Upload, Users, Calendar, CreditCard, Search, Star, X, User } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";

interface Provider {
  id: string;
  name: string;
  type: "Empresa" | "Independiente";
  city: string;
  rating: number;
  avatar: string;
  selected?: boolean;
}

const mockProviders: Provider[] = [
  {
    id: "1",
    name: "Detodo S.A.",
    type: "Empresa", 
    city: "Guayaquil",
    rating: 5,
    avatar: "/placeholder-avatar.png"
  },
  {
    id: "2",
    name: "TrabajosVariados SA",
    type: "Empresa",
    city: "Guayaquil", 
    rating: 5,
    avatar: "/placeholder-avatar.png"
  },
  {
    id: "3",
    name: "Emilio Gonzalez",
    type: "Independiente",
    city: "Guayaquil",
    rating: 5,
    avatar: "/placeholder-avatar.png"
  },
  {
    id: "4",
    name: "Gabriela Moreira",
    type: "Independiente",
    city: "Guayaquil",
    rating: 5,
    avatar: "/placeholder-avatar.png"
  }
];

export default function ServiceRequest() {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  
  // Form state
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Tarjeta" | "Efectivo">("Efectivo");
  
  // Modal states
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [showProviderTypeModal, setShowProviderTypeModal] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);
  const [providerSearchQuery, setProviderSearchQuery] = useState("");
  const [providerTypeFilter, setProviderTypeFilter] = useState<"Cualquiera" | "Empresa" | "Independiente">("Cualquiera");

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleProviderSelection = (provider: Provider) => {
    setSelectedProviders(prev => {
      const exists = prev.find(p => p.id === provider.id);
      if (exists) {
        return prev.filter(p => p.id !== provider.id);
      } else {
        return [...prev, provider];
      }
    });
  };

  const handleProviderModalAccept = () => {
    setShowProviderModal(false);
  };

  const handleProviderModalCancel = () => {
    setSelectedProviders([]);
    setShowProviderModal(false);
  };

  const handleSubmitRequest = () => {
    // In a real app, this would submit the service request
    console.log("Submitting request:", {
      serviceType,
      description,
      selectedFile,
      selectedDate,
      selectedTime,
      paymentMethod,
      selectedProviders
    });
    navigate("/requests");
  };

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(providerSearchQuery.toLowerCase());
    const matchesType = providerTypeFilter === "Cualquiera" || provider.type === providerTypeFilter;
    return matchesSearch && matchesType;
  });

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
            {serviceType || "Historial"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Request Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="font-roboto text-2xl font-bold text-black">
            Detalles de solicitud
          </h2>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">*</span>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-purple-700 rounded"></span>
                <span className="font-roboto text-purple-700 font-medium">Descripción:</span>
              </div>
            </div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={serviceType ? "Describa su solicitud..." : "Detalles de su hogar/ubicación o referencias..."}
              className="w-full min-h-20 bg-gray-100 border-none rounded-lg text-gray-700 placeholder:text-gray-400 font-abeezee resize-none"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-purple-700" />
              <span className="font-roboto text-purple-700 font-medium">Subir foto (opcional):</span>
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center space-x-2 cursor-pointer text-blue-500 hover:text-blue-600"
              >
                <span className="font-abeezee text-sm">Choose File</span>
                <span className="font-abeezee text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : "no file selected"}
                </span>
              </label>
            </div>
          </div>

          {/* Date/Time Selection for specific services */}
          {serviceType && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">*</span>
                <Calendar className="h-5 w-5 text-purple-700" />
                <span className="font-roboto text-purple-700 font-medium">Fecha/hora:</span>
              </div>
              <div className="flex space-x-4">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 bg-gray-100 border-none rounded-lg"
                />
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="flex-1 bg-gray-100 border-none rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {serviceType && (
          <>
            {/* Location Details Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-roboto text-2xl font-bold text-black mb-4">
                Detalles de la ubicación
              </h2>
              {/* Location details would go here - could include map integration */}
              <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                Selección de ubicación
              </div>
            </div>

            {/* Available Providers Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-roboto text-2xl font-bold text-black mb-4">
                Proveedores disponibles
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">*</span>
                  <Users className="h-5 w-5 text-purple-700" />
                  <span className="font-roboto text-purple-700 font-medium">Selección de proveedores:</span>
                </div>
                
                <Button
                  onClick={() => setShowProviderModal(true)}
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white font-abeezee text-lg py-4 rounded-lg"
                >
                  Ver proveedores disponibles
                </Button>
                
                {selectedProviders.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="font-abeezee text-sm text-gray-600">
                      Proveedores seleccionados: {selectedProviders.length}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProviders.map(provider => (
                        <div key={provider.id} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          {provider.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Details Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-roboto text-2xl font-bold text-black mb-4">
                Detalles del pago
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">*</span>
                  <CreditCard className="h-5 w-5 text-purple-700" />
                  <span className="font-roboto text-purple-700 font-medium">Selección de pago:</span>
                </div>
                
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Tarjeta"
                      checked={paymentMethod === "Tarjeta"}
                      onChange={(e) => setPaymentMethod(e.target.value as "Tarjeta")}
                      className="text-purple-700"
                    />
                    <span className="font-abeezee text-gray-700">Tarjeta</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Efectivo"
                      checked={paymentMethod === "Efectivo"}
                      onChange={(e) => setPaymentMethod(e.target.value as "Efectivo")}
                      className="text-purple-700"
                    />
                    <span className="font-abeezee text-gray-700">Efectivo</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={handleSubmitRequest}
                className="bg-purple-700 hover:bg-purple-800 text-white font-abeezee text-lg px-12 py-4 rounded-full shadow-lg"
              >
                Enviar Solicitud
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Provider Selection Modal */}
      {showProviderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-purple-700 rounded-t-3xl px-6 py-4 relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleProviderModalCancel}
                className="absolute top-4 right-4 text-white p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Search Bar */}
              <div className="relative bg-yellow-400 rounded-lg p-2">
                <div className="flex items-center">
                  <Search className="h-5 w-5 text-purple-700 mr-3" />
                  <input
                    type="text"
                    placeholder="Buscar proveedor"
                    value={providerSearchQuery}
                    onChange={(e) => setProviderSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-purple-700 placeholder:text-purple-700 font-abeezee text-sm"
                  />
                  <label className="flex items-center space-x-2 ml-4">
                    <input type="radio" name="showAll" className="w-4 h-4" />
                    <span className="font-abeezee text-black text-sm">Todos</span>
                  </label>
                </div>
              </div>

              {/* Provider Type Filter */}
              <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3 border-b border-gray-300">
                <span className="font-abeezee text-black text-sm">Tipo de Proveedor</span>
                <button
                  onClick={() => setShowProviderTypeModal(true)}
                  className="font-abeezee text-black text-sm"
                >
                  {providerTypeFilter} ▼
                </button>
              </div>

              {/* Provider List */}
              <div className="space-y-3">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="bg-purple-700 rounded-lg p-4 text-white cursor-pointer relative"
                    onClick={() => handleProviderSelection(provider)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/TEMP/6a72d392edb22d11a7512353385fd0131d9addaa?width=62"
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>

                      <div className="flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowProviderModal(false);
                            navigate(`/provider/${provider.id}`);
                          }}
                          className="font-abeezee text-sm font-medium hover:underline text-left block"
                        >
                          {provider.name} - {provider.type}
                        </button>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-white mr-1" viewBox="0 0 14 16" fill="none">
                              <path d="M7.00008 1.33301L8.80258 5.50634L12.8334 6.17967L9.91675 9.42634L10.6051 14.013L7.00008 11.8463L3.39508 14.013L4.08341 9.42634L1.16675 6.17967L5.19758 5.50634L7.00008 1.33301Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ))}
                        </div>
                        <p className="font-abeezee text-xs mt-1">
                          <span className="font-bold">Ciudad:</span> {provider.city}
                        </p>
                      </div>

                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <div className={`w-5 h-5 rounded-full border-2 ${selectedProviders.find(p => p.id === provider.id) ? 'bg-white border-gray-400' : 'border-gray-400'} flex items-center justify-center`}>
                          {selectedProviders.find(p => p.id === provider.id) && (
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex space-x-4 p-6">
              <Button
                onClick={handleProviderModalAccept}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-abeezee py-3 rounded-xl shadow-lg"
              >
                Aceptar
              </Button>
              <Button
                onClick={handleProviderModalCancel}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-abeezee py-3 rounded-xl shadow-lg"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Provider Type Selection Modal */}
      {showProviderTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-sm">
            <div className="p-6 space-y-0">
              <div className="text-center pb-4">
                <h3 className="font-roboto text-xl font-bold text-black mb-2">Tipo de proveedor</h3>
                <p className="font-roboto text-black text-lg leading-tight">
                  Seleccione un filtro para mostrar el contenido
                </p>
                <p className="font-roboto text-black text-lg leading-tight mt-2">
                  Elija solo uno
                </p>
              </div>

              <div className="divide-y divide-black">
                {["Cualquiera", "Empresa", "Independiente"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setProviderTypeFilter(type as typeof providerTypeFilter)}
                    className={`w-full py-4 text-center font-roboto text-base ${
                      providerTypeFilter === type ? "text-black font-medium bg-gray-50" : "text-black"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex border-t border-black">
                <button
                  onClick={() => setShowProviderTypeModal(false)}
                  className="flex-1 py-4 text-center font-roboto text-purple-700 text-base border-r border-black rounded-bl-3xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowProviderTypeModal(false)}
                  className="flex-1 py-4 text-center font-roboto text-purple-700 font-bold text-base rounded-br-3xl"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
