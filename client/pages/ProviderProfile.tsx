import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';

const ProviderProfile: React.FC = () => {
  const navigate = useNavigate();
  const { providerId } = useParams<{ providerId: string }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock provider data - in real app this would come from API
  const provider = {
    id: providerId || '1',
    name: 'Sebastian Ceballos',
    type: 'Proveedor independiente',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/9db2454a3d7cf43a580bcfb75d1ef94e93fd9780?width=150',
    overallRating: 4.5,
    services: [
      {
        id: 1,
        name: 'Albañil',
        icon: 'https://api.builder.io/api/v1/image/assets/TEMP/8f67643565dbcee328d41e555093ad3541d26f59?width=226',
        rating: 4
      },
      {
        id: 2,
        name: 'Asistencia Mecánica',
        icon: 'https://api.builder.io/api/v1/image/assets/TEMP/fac4736e091e3748acd55ed5a27abada69526925?width=190',
        rating: 5
      },
      {
        id: 3,
        name: 'Cambio de Aceite',
        icon: 'https://api.builder.io/api/v1/image/assets/TEMP/70a6379f1e696157daa1d085fe8b8c7c9732374b?width=190',
        rating: 5
      },
      {
        id: 4,
        name: 'Belleza',
        icon: 'https://api.builder.io/api/v1/image/assets/TEMP/34cc579aa0b77c4a243f9dc2179da2c61bd862ef?width=182',
        rating: 4
      }
    ]
  };

  const renderStars = (rating: number, size: 'small' | 'large' = 'small') => {
    const stars = [];
    const starSize = size === 'large' ? 'w-12 h-12' : 'w-9 h-9';
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Yellow filled star
        stars.push(
          <svg key={i} className={`${starSize} fill-yellow-400`} viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      } else {
        // Black outlined star
        stars.push(
          <svg key={i} className={`${starSize} fill-black`} viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      }
    }
    return stars;
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate('/dashboard');
  };

  const goToChat = () => {
    navigate('/chat');
  };

  const goToRequests = () => {
    navigate('/requests');
  };

  const goToNotifications = () => {
    navigate('/notifications');
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Purple Header */}
      <div className="bg-purple-700 h-20 relative">
        {/* Purple oval background */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
          <svg width="149" height="99" viewBox="0 0 149 99" fill="none">
            <ellipse cx="74.5" cy="49.5" rx="74.5" ry="49.5" fill="#4B309E"/>
          </svg>
        </div>
        
        {/* Header content */}
        <div className="relative z-10 flex items-center justify-between px-3 pt-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-12"
          >
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/67e9e0537dff2ed8227a26f66de6acc9e3363192?width=78" 
              alt="Menu" 
              className="w-full h-full object-contain"
            />
          </button>
          
          <h1 className="text-yellow-300 font-['Knewave'] text-2xl leading-8">
            Vive Facil!
          </h1>
          
          <button className="w-10 h-9">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/dd0bbb70ad47bd072d5ccdf46076d7b89e2bd2ea?width=80" 
              alt="Logout" 
              className="w-full h-full object-contain"
            />
          </button>
        </div>
      </div>

      {/* Yellow section with back button */}
      <div className="bg-yellow-400 h-23 border-b-3 border-purple-600 relative">
        <div className="flex items-center px-4 pt-6 pb-3">
          <button 
            onClick={goBack}
            className="flex items-center text-purple-600 font-['ABeeZee'] text-3xl mr-2"
          >
            &lt;
          </button>
          <span className="text-purple-600 font-['ABeeZee'] text-sm font-normal tracking-wide">
            Historial
          </span>
        </div>
      </div>

      {/* Provider Info Section */}
      <div className="px-3 pt-6">
        <div className="flex items-center mb-6">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-19 h-19 rounded-full mr-4"
          />
          <div>
            <h2 className="text-black font-['Roboto'] text-2xl font-bold leading-5 mb-1">
              {provider.name}
            </h2>
            <p className="text-black font-['Roboto'] text-sm font-bold leading-5">
              {provider.type}
            </p>
          </div>
        </div>

        {/* Overall Rating */}
        <div className="bg-gray-200 rounded-sm p-4 mb-6">
          <div className="flex justify-center">
            {renderStars(provider.overallRating, 'large')}
          </div>
        </div>

        {/* Services with Ratings */}
        <div className="space-y-4">
          {provider.services.map((service) => (
            <div key={service.id} className="flex items-center">
              <div className="w-24 h-28 mr-4 flex-shrink-0">
                <img
                  src={service.icon}
                  alt={service.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-sm p-3">
                  <div className="flex justify-center">
                    {renderStars(service.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white h-19 flex items-center justify-around px-4 border-t">
        <button onClick={goToHome} className="flex flex-col items-center">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/0f286db6b87f8d5a149fc34ec15f2bea06a28e9d?width=114" 
            alt="Home" 
            className="w-14 h-8 mb-1"
          />
          <span className="text-gray-600 font-['Roboto'] text-sm font-light">Inicio</span>
        </button>

        <button onClick={goToChat} className="flex flex-col items-center">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/bff4824a3cc2c82c8032710514e1ace80646eef3?width=55" 
            alt="Chat" 
            className="w-7 h-6 mb-1"
          />
          <span className="text-gray-600 font-['Roboto'] text-sm font-light text-center">Chat</span>
        </button>

        <button onClick={goToRequests} className="flex flex-col items-center">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/a3461685069de8a04e548075c28d91a110ef4cf2?width=82" 
            alt="Requests" 
            className="w-10 h-10 mb-1"
          />
          <span className="text-gray-600 font-['Roboto'] text-sm font-light text-center">Solicitudes</span>
        </button>

        <button onClick={goToNotifications} className="flex flex-col items-center">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/8f2aaf128e763eed4ac39c18744879efcfb6f615?width=58" 
            alt="Notifications" 
            className="w-7 h-9 mb-1"
          />
          <span className="text-gray-600 font-['Roboto'] text-sm font-light text-center">Notificaciones</span>
        </button>
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </div>
  );
};

export default ProviderProfile;
