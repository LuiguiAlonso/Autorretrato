import React, { useEffect, useState } from 'react';

const Dos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shadowLoaded, setShadowLoaded] = useState(false);
  const [fantasticElements, setFantasticElements] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setShadowLoaded(true), 1000);
    
    // Generar elementos fantásticos en la sombra
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      type: ['castle', 'star', 'creature', 'galaxy'][Math.floor(Math.random() * 4)],
      size: Math.random() * 30 + 15,
      left: Math.random() * 80 + 10,
      top: Math.random() * 60 + 20,
      delay: Math.random() * 3,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.6 + 0.4
    }));
    setFantasticElements(elements);
  }, []);

  const renderFantasyElement = (element) => {
    const baseClasses = "absolute rounded-full transition-all duration-1000";
    
    switch (element.type) {
      case 'castle':
        return (
          <div 
            className={`${baseClasses} bg-gradient-to-t from-yellow-400 to-orange-300`}
            style={{
              width: `${element.size}px`,
              height: `${element.size * 1.5}px`,
              clipPath: 'polygon(20% 100%, 0% 70%, 0% 40%, 20% 40%, 20% 20%, 40% 20%, 40% 0%, 60% 0%, 60% 20%, 80% 20%, 80% 40%, 100% 40%, 100% 70%, 80% 100%)'
            }}
          />
        );
      case 'star':
        return (
          <div 
            className={`${baseClasses} bg-gradient-to-br from-blue-200 to-indigo-300`}
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        );
      case 'creature':
        return (
          <div className="relative">
            <div 
              className={`${baseClasses} bg-gradient-to-br from-purple-300 to-pink-300`}
              style={{
                width: `${element.size}px`,
                height: `${element.size * 0.8}px`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
              }}
            />
            <div 
              className="absolute bg-purple-400 rounded-full"
              style={{
                width: `${element.size * 0.3}px`,
                height: `${element.size * 0.3}px`,
                top: '20%',
                left: '70%'
              }}
            />
          </div>
        );
      case 'galaxy':
        return (
          <div 
            className={`${baseClasses} bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300`}
            style={{
              width: `${element.size}px`,
              height: `${element.size * 0.6}px`,
              borderRadius: '50%',
              transform: `rotate(${element.rotation}deg)`
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 overflow-hidden relative">
      {/* Cielo estrellado */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-100 rounded-full shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Luna */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-full shadow-lg shadow-yellow-300/30 opacity-80">
        <div className="absolute inset-2 bg-gradient-to-br from-yellow-100 to-transparent rounded-full"></div>
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* Escena del niño bajo el árbol */}
        <div className="relative w-full max-w-5xl h-[500px] mb-16">
          
          {/* Árbol */}
          <div 
            className={`absolute left-1/3 top-0 transition-all duration-1200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Copa del árbol */}
            <div className="relative">
              <div className="w-64 h-48 bg-gradient-to-br from-green-600 to-green-800 rounded-full"></div>
              <div className="absolute top-4 left-8 w-32 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full opacity-80"></div>
              <div className="absolute top-8 right-12 w-40 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-70"></div>
            </div>
            
            {/* Tronco */}
            <div className="w-8 h-32 bg-gradient-to-r from-amber-800 to-amber-700 mx-auto -mt-4"></div>
          </div>

          {/* Niño sentado */}
          <div 
            className={`absolute left-1/3 bottom-16 ml-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            {/* Cuerpo del niño */}
            <div className="relative">
              <div className="w-8 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-t-full"></div>
              <div className="w-6 h-6 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mx-auto -mt-2"></div>
              <div className="w-12 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-b-xl -mt-2"></div>
            </div>
          </div>

          {/* Sombra mágica proyectada hacia arriba */}
          <div 
            className={`absolute left-1/2 top-0 w-80 h-96 transition-all duration-1500 delay-700 ${
              shadowLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.4) 50%, rgba(168, 85, 247, 0.3) 100%)',
              clipPath: 'polygon(40% 100%, 45% 80%, 35% 60%, 50% 40%, 65% 60%, 55% 80%, 60% 100%)',
              transform: 'rotate(-10deg)'
            }}
          >
            {/* Elementos fantásticos dentro de la sombra */}
            {fantasticElements.map((element) => (
              <div
                key={element.id}
                className={`absolute transition-all duration-2000 ${
                  shadowLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  left: `${element.left}%`,
                  top: `${element.top}%`,
                  animationDelay: `${element.delay}s`,
                  opacity: element.opacity
                }}
              >
                <div 
                  className="animate-pulse hover:scale-110 transition-transform duration-300"
                  style={{
                    animation: `float-fantasy-${element.id} ${3 + Math.random() * 2}s ease-in-out infinite alternate`
                  }}
                >
                  {renderFantasyElement(element)}
                </div>
              </div>
            ))}
          </div>

          {/* Césped */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-700 to-green-600 rounded-t-3xl"></div>
        </div>

        {/* Texto principal */}
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1200 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-emerald-300/20 shadow-xl shadow-emerald-500/10">
            <p className="text-lg md:text-xl text-emerald-50 leading-relaxed mb-6 font-light">
De niño jugaba como cualquiera, pero cuando algo dejaba de interesarme, me sumergía en mi propio mundo. Allí inventaba escenarios y tejía historias, como si la imaginación fuera un refugio secreto al que solo yo tenía acceso.
            </p>
          </div>
        </div>

        {/* Navegación */}
        <div 
          className={`mt-12 flex space-x-6 transition-all duration-1000 delay-1200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={() => window.location.href = '/'}
            className="group bg-emerald-600/20 hover:bg-emerald-500/30 border border-emerald-400/30 hover:border-emerald-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-emerald-200 group-hover:text-emerald-100">
              <svg className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 12 12">
                <path d="M7.5 9l-3-3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              <span>Anterior</span>
            </div>
          </button>
          
          <button 
            onClick={() => window.location.href = '/tres'}
            className="group bg-emerald-600/20 hover:bg-emerald-500/30 border border-emerald-400/30 hover:border-emerald-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-emerald-200 group-hover:text-emerald-100">
              <span>Siguiente</span>
              <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 12 12">
                <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Estilos de animación dinámicos */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float-fantasy-0 { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(-8px) rotate(5deg); } }
        @keyframes float-fantasy-1 { 0% { transform: translateY(0px) rotate(10deg); } 100% { transform: translateY(-12px) rotate(15deg); } }
        @keyframes float-fantasy-2 { 0% { transform: translateY(0px) rotate(-5deg); } 100% { transform: translateY(-10px) rotate(0deg); } }
        @keyframes float-fantasy-3 { 0% { transform: translateY(0px) rotate(20deg); } 100% { transform: translateY(-6px) rotate(25deg); } }
        @keyframes float-fantasy-4 { 0% { transform: translateY(0px) rotate(-10deg); } 100% { transform: translateY(-14px) rotate(-5deg); } }
        @keyframes float-fantasy-5 { 0% { transform: translateY(0px) rotate(15deg); } 100% { transform: translateY(-9px) rotate(20deg); } }
        @keynames float-fantasy-6 { 0% { transform: translateY(0px) rotate(-15deg); } 100% { transform: translateY(-11px) rotate(-10deg); } }
        @keyframes float-fantasy-7 { 0% { transform: translateY(0px) rotate(5deg); } 100% { transform: translateY(-13px) rotate(10deg); } }
        @keyframes float-fantasy-8 { 0% { transform: translateY(0px) rotate(-20deg); } 100% { transform: translateY(-7px) rotate(-15deg); } }
        @keyframes float-fantasy-9 { 0% { transform: translateY(0px) rotate(25deg); } 100% { transform: translateY(-15px) rotate(30deg); } }
        @keyframes float-fantasy-10 { 0% { transform: translateY(0px) rotate(-8deg); } 100% { transform: translateY(-5px) rotate(-3deg); } }
        @keyframes float-fantasy-11 { 0% { transform: translateY(0px) rotate(12deg); } 100% { transform: translateY(-16px) rotate(17deg); } }
      `}</style>
    </div>
  );
};

export default Dos;