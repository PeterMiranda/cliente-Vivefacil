import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";
import RequestDetail from "./pages/RequestDetail";
import Chat from "./pages/Chat";
import ChatConversation from "./pages/ChatConversation";
import History from "./pages/History";
import ServiceRequest from "./pages/ServiceRequest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/request/:requestId" element={<RequestDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:chatId" element={<ChatConversation />} />
          <Route path="/history" element={<History />} />
          <Route path="/service-request" element={<ServiceRequest />} />
          <Route path="/service-request/:serviceType" element={<ServiceRequest />} />
          <Route path="/demo" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
