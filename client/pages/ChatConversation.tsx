import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, LogOut, Play, Camera, Mic } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";

interface Message {
  id: string;
  type: "text" | "voice";
  content: string;
  timestamp: string;
  isFromUser: boolean;
  duration?: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    type: "text",
    content: "Hola",
    timestamp: "12:36 PM",
    isFromUser: false,
  },
  {
    id: "2",
    type: "text",
    content: "Hola",
    timestamp: "12:36 PM",
    isFromUser: true,
  },
  {
    id: "3",
    type: "text",
    content: "El trabajo esta ya está completado",
    timestamp: "12:36 PM",
    isFromUser: false,
  },
  {
    id: "4",
    type: "voice",
    content: "",
    timestamp: "12:36 PM",
    isFromUser: false,
    duration: "0:30",
  },
  {
    id: "5",
    type: "text",
    content: "Esta bien",
    timestamp: "13:47 PM",
    isFromUser: true,
  },
  {
    id: "6",
    type: "text",
    content: "Gracias",
    timestamp: "13:48 PM",
    isFromUser: true,
  },
  {
    id: "7",
    type: "voice",
    content: "",
    timestamp: "13:54 PM",
    isFromUser: true,
    duration: "0:30",
  },
];

export default function ChatConversation() {
  const { chatId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/chat");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
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

      {/* Chat Header with Provider Info */}
      <div className="bg-gray-100 border-b border-gray-300 px-4 py-4">
        <div className="flex items-center space-x-3">
          {/* Profile Picture */}
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
            <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
          </div>

          {/* Provider Info */}
          <div>
            <h3 className="font-abeezee text-black text-base font-medium">
              Provedor 1
            </h3>
            <p className="font-abeezee text-black text-base">
              Albañil
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {mockMessages.map((message, index) => (
          <div key={message.id} className="flex flex-col">
            {/* Message Bubble */}
            <div
              className={`flex ${message.isFromUser ? "justify-end" : "justify-start"}`}
            >
              {message.type === "text" ? (
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.isFromUser
                      ? "bg-purple-600 bg-opacity-75 text-black"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <p className="font-roboto text-lg leading-tight">
                    {message.content}
                  </p>
                  <p
                    className={`font-abeezee text-xs mt-1 ${
                      message.isFromUser ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              ) : (
                <div
                  className={`flex items-center space-x-2 px-4 py-3 rounded-2xl ${
                    message.isFromUser
                      ? "bg-purple-600 bg-opacity-75"
                      : "bg-gray-300"
                  }`}
                >
                  <Play className="h-6 w-6 text-black" />
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`h-1 w-20 rounded-full ${
                          message.isFromUser ? "bg-white bg-opacity-50" : "bg-purple-600"
                        }`}
                      >
                        <div
                          className={`h-1 w-4 rounded-full ${
                            message.isFromUser ? "bg-white" : "bg-purple-600"
                          }`}
                        ></div>
                      </div>
                      <span className="font-abeezee text-xs text-black">
                        {message.duration}
                      </span>
                    </div>
                    <p
                      className={`font-abeezee text-xs mt-1 ${
                        message.isFromUser ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Visual separator for audio messages */}
            {message.type === "voice" && (
              <div className="flex items-center my-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    message.isFromUser ? "bg-gray-300 ml-auto mr-4" : "bg-purple-600 ml-4"
                  }`}
                ></div>
                <div
                  className={`flex-1 h-px ${
                    message.isFromUser ? "bg-gray-300" : "bg-black"
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-gray-100 rounded-t-3xl px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="w-full pl-4 pr-4 py-3 bg-white border-none rounded-full shadow-inner text-gray-700 placeholder:text-gray-400 font-roboto"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <Camera className="h-8 w-8 text-gray-600" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <Mic className="h-6 w-6 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
