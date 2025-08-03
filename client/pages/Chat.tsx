import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LogOut, ChevronLeft, Home, MessageSquare, FileText, Bell } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";

interface ChatPreview {
  id: string;
  providerName: string;
  serviceType: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isVoiceMessage?: boolean;
}

const chatPreviews: ChatPreview[] = [
  {
    id: "1",
    providerName: "Provedor 1",
    serviceType: "Albañil",
    lastMessage: "Provedor 1: Listo!!!",
    timestamp: "12:36PM",
  },
  {
    id: "2",
    providerName: "Nombre Apellido Provedor 2",
    serviceType: "Albañil",
    lastMessage: "Usted: Me confirmará",
    timestamp: "Ayer",
  },
  {
    id: "3",
    providerName: "Nombre Provedor 3",
    serviceType: "Albañil",
    lastMessage: "Nombre: De nada",
    timestamp: "Martes",
    unreadCount: 2,
  },
  {
    id: "4",
    providerName: "Provedor 1",
    serviceType: "Albañil",
    lastMessage: "Usted: 🎤 1:36",
    timestamp: "21/6/25",
    isVoiceMessage: true,
  },
];

export default function Chat() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  const handleNavigateToRequests = () => {
    navigate("/requests");
  };

  const handleNavigateToHome = () => {
    navigate("/dashboard");
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
            chat
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

      {/* Chat List */}
      <div className="pb-20">
        {chatPreviews.map((chat, index) => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className={`cursor-pointer hover:bg-gray-50 transition-colors ${
              index > 0 ? 'border-t border-gray-300' : ''
            }`}
          >
            <div className="px-4 py-4 bg-gray-100 shadow-sm">
              <div className="flex items-center space-x-3">
                {/* Profile Picture */}
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-abeezee text-black text-base font-medium leading-tight">
                        {chat.providerName}
                      </h3>
                      <p className="font-abeezee text-black text-base">
                        {chat.serviceType}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-abeezee text-gray-500 text-xs">
                        {chat.timestamp}
                      </span>
                      {chat.unreadCount && (
                        <div className="bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center mt-1">
                          <span className="text-white font-roboto text-xs font-bold">
                            {chat.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="font-abeezee text-gray-500 text-xs truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button onClick={handleNavigateToHome} className="flex flex-col items-center space-y-1 py-2">
            <Home className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 font-roboto">Inicio</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 py-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            <span className="text-xs text-purple-600 font-roboto">Chat</span>
          </button>
          
          <button onClick={handleNavigateToRequests} className="flex flex-col items-center space-y-1 py-2">
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
