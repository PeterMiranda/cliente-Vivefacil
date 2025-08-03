import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  LogOut,
  MapPin,
  Edit,
  Image,
  AlertCircle,
} from "lucide-react";
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

  const handleProviderClick = () => {
    navigate("/provider/1");
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
          <div className="bg-gray-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-9 w-9 text-black flex-shrink-0" />
            <div className="flex-1">
              <p className="font-abeezee text-purple-700 text-sm leading-tight">
                La solicitud se encuentra en estado asignada. Puede confirma que
                el servicio se ha realizado efectivamente con el siguiente botón
              </p>
            </div>
          </div>

          {/* Provider Section */}
          <div className="mt-6">
            <h3 className="font-roboto text-purple-700 text-lg font-bold mb-4">
              Proveedor asignado:
            </h3>
            <button
              onClick={handleProviderClick}
              className="w-full bg-purple-700 rounded-lg p-4 text-white hover:bg-purple-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/6a72d392edb22d11a7512353385fd0131d9addaa?width=62"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </div>

                <div className="flex-1 text-left">
                  <div className="font-abeezee text-sm font-medium">
                    Sebastian Ceballos
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-white mr-1"
                        viewBox="0 0 14 16"
                        fill="none"
                      >
                        <path
                          d="M7.00008 1.33301L8.80258 5.50634L12.8334 6.17967L9.91675 9.42634L10.6051 14.013L7.00008 11.8463L3.39508 14.013L4.08341 9.42634L1.16675 6.17967L5.19758 5.50634L7.00008 1.33301Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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

        {/* Request Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="font-roboto text-2xl font-bold text-black">
            Detalles de la solicitud
          </h2>

          {/* Location */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-700" />
              <span className="font-roboto text-purple-700 font-medium">
                Ubicación:
              </span>
            </div>
            <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-abeezee text-lg py-3 rounded-lg">
              Ver en el mapa
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Edit className="h-5 w-5 text-purple-700" />
              <span className="font-roboto text-purple-700 font-medium">
                Descripción:
              </span>
            </div>
            <p className="font-abeezee text-gray-700">ayuda con proyecto</p>
          </div>

          {/* Reference Photo */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Image className="h-5 w-5 text-purple-700" />
              <span className="font-roboto text-purple-700 font-medium">
                Foto de referencia:
              </span>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/22fb27bd51daa7a49f2b6de2cc9a820d6d675f86?width=654"
                alt="Reference"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
