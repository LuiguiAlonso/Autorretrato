import React, { useState, useEffect } from 'react';

const Cinco = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [fragmentsConverging, setFragmentsConverging] = useState(false);
  const [silhouetteFormed, setSilhouetteFormed] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsVisible(true), 300),
      setTimeout(() => setFragmentsConverging(true), 1000),
      setTimeout(() => setSilhouetteFormed(true), 2500),
      setTimeout(() => setTextRevealed(true), 3500)
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  // Fragmentos que formarán la silueta
  const fragments = [
    // Espejos (cabeza)
    { id: 'mirror1', type: 'mirror', initialPos: 'top-10 left-20', finalPos: 'top-32 left-1/2 -translate-x-1/2', size: 'w-8 h-8' },
    { id: 'mirror2', type: 'mirror', initialPos: 'top-20 right-16', finalPos: 'top-36 left-1/2 -translate-x-2', size: 'w-6 h-6' },
    { id: 'mirror3', type: 'mirror', initialPos: 'top-32 left-12', finalPos: 'top-40 left-1/2 translate-x-2', size: 'w-7 h-7' },
    
    // Estrellas (torso)
    { id: 'star1', type: 'star', initialPos: 'top-1/3 right-24', finalPos: 'top-48 left-1/2 -translate-x-6', size: 'w-6 h-6' },
    { id: 'star2', type: 'star', initialPos: 'top-1/2 left-16', finalPos: 'top-52 left-1/2 translate-x-4', size: 'w-8 h-8' },
    { id: 'star3', type: 'star', initialPos: 'top-40 right-12', finalPos: 'top-56 left-1/2 -translate-x-3', size: 'w-5 h-5' },
    { id: 'star4', type: 'star', initialPos: 'top-60 left-24', finalPos: 'top-60 left-1/2 translate-x-6', size: 'w-7 h-7' },
    
    // Manos (brazos)
    { id: 'hand1', type: 'hand', initialPos: 'top-1/2 left-8', finalPos: 'top-52 left-1/2 -translate-x-16', size: 'w-10 h-10' },
    { id: 'hand2', type: 'hand', initialPos: 'top-1/2 right-8', finalPos: 'top-52 left-1/2 translate-x-16', size: 'w-10 h-10' },
    
    // Caminos (piernas)
    { id: 'path1', type: 'path', initialPos: 'bottom-32 left-20', finalPos: 'top-72 left-1/2 -translate-x-4', size: 'w-8 h-12' },
    { id: 'path2', type: 'path', initialPos: 'bottom-28 right-20', finalPos: 'top-72 left-1/2 translate-x-4', size: 'w-8 h-12' },
  ];

  const renderFragment = (fragment) => {
    const baseClasses = `absolute ${fragment.size} transition-all duration-2000 ease-out transform`;
    const positionClasses = fragmentsConverging ? fragment.finalPos : fragment.initialPos;
    const opacityClasses = isVisible ? 'opacity-100' : 'opacity-0';

    switch (fragment.type) {
      case 'mirror':
        return (
          <div key={fragment.id} className={`${baseClasses} ${positionClasses} ${opacityClasses}`}>
            <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-600 rounded shadow-lg relative overflow-hidden">
              <div className="absolute inset-1 bg-gradient-to-br from-purple-400/60 to-pink-400/40 rounded blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-radial from-white/40 to-transparent rounded"></div>
            </div>
          </div>
        );
      
      case 'star':
        return (
          <div key={fragment.id} className={`${baseClasses} ${positionClasses} ${opacityClasses}`}>
            <div className="w-full h-full relative">
              <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400 drop-shadow-lg">
                <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-sm animate-pulse"></div>
            </div>
          </div>
        );
      
      case 'hand':
        return (
          <div key={fragment.id} className={`${baseClasses} ${positionClasses} ${opacityClasses}`}>
            <div className="w-full h-full relative">
              <svg viewBox="0 0 24 24" className="w-full h-full text-pink-400 drop-shadow-lg">
                <path fill="currentColor" d="M13 1.07V9H8v5.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V9c0-.55-.45-1-1-1s-1 .45-1 1v7c0 .55.45 1 1 1h11.5c.83 0 1.5-.67 1.5-1.5V8c0-2.21-1.79-4-4-4-1.95 0-3.58 1.4-3.93 3.25L13 1.07z"/>
              </svg>
              <div className="absolute inset-0 bg-pink-400/30 rounded-full blur-sm animate-pulse"></div>
            </div>
          </div>
        );
      
      case 'path':
        return (
          <div key={fragment.id} className={`${baseClasses} ${positionClasses} ${opacityClasses}`}>
            <div className="w-full h-full relative">
              <svg viewBox="0 0 24 24" className="w-full h-full text-blue-400 drop-shadow-lg">
                <path fill="currentColor" d="M3 18h2v-1c0-.55.45-1 1-1s1 .45 1 1v1h2c.55 0 1 .45 1 1s-.45 1-1 1H7v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H3c-.55 0-1-.45-1-1s.45-1 1-1zm6-14h2V2c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1h-2v2c0 .55-.45 1-1 1s-1-.45-1-1V6H9c-.55 0-1-.45-1-1s.45-1 1-1zm11 7h-2v1c0 .55-.45 1-1 1s-1-.45-1-1v-1h-2c-.55 0-1-.45-1-1s.45-1 1-1h2v-2c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1z"/>
              </svg>
              <div className="absolute inset-0 bg-blue-400/30 rounded blur-sm animate-pulse"></div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Campo de estrellas dinámico */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${1.5 + Math.random() * 2.5}s`
            }}
          />
        ))}
      </div>

      {/* Ondas de energía */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className={`absolute left-1/2 top-1/2 rounded-full border border-white/20 transition-all duration-3000 ${
              silhouetteFormed 
                ? 'w-96 h-96 -translate-x-48 -translate-y-48 opacity-100' 
                : 'w-0 h-0 -translate-x-0 -translate-y-0 opacity-0'
            }`}
            style={{
              animationDelay: `${ring * 0.5}s`,
              animation: silhouetteFormed ? `pulse-ring ${3 + ring}s ease-out infinite` : 'none'
            }}
          />
        ))}
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        


        {/* Área de convergencia - Silueta formada por fragmentos */}
        <div className="relative w-96 h-96 mb-16">
          {/* Silueta base */}
          <div className={`absolute left-1/2 top-1/2 w-40 h-72 -translate-x-1/2 -translate-y-1/2 transition-all duration-3000 ${
            silhouetteFormed ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="w-full h-full bg-gradient-to-b from-purple-400/20 to-transparent rounded-full"></div>
          </div>

          {/* Red de conexiones entre fragmentos */}
          {silhouetteFormed && (
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 384 384">
                {/* Conexiones desde el centro hacia cada fragmento */}
                <g stroke="rgba(147, 51, 234, 0.4)" strokeWidth="1" fill="none">
                  <line x1="192" y1="192" x2="192" y2="128" className="animate-pulse" />
                  <line x1="192" y1="192" x2="176" y2="144" className="animate-pulse" />
                  <line x1="192" y1="192" x2="208" y2="160" className="animate-pulse" />
                  <line x1="192" y1="192" x2="128" y2="208" className="animate-pulse" />
                  <line x1="192" y1="192" x2="256" y2="208" className="animate-pulse" />
                  <line x1="192" y1="192" x2="180" y2="288" className="animate-pulse" />
                  <line x1="192" y1="192" x2="204" y2="288" className="animate-pulse" />
                </g>
                
                {/* Círculo central */}
                <circle cx="192" cy="192" r="8" fill="rgba(147, 51, 234, 0.6)" className="animate-pulse" />
              </svg>
            </div>
          )}

          {/* Fragmentos flotantes */}
          {fragments.map(renderFragment)}

          {/* Partículas de conexión */}
          {silhouetteFormed && (
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 12}deg) translateY(-${80 + Math.random() * 40}px)`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${2 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Texto de cierre */}
        <div className={`max-w-5xl mx-auto text-center transition-all duration-2000 transform ${
          textRevealed ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-purple-400/50 shadow-2xl shadow-purple-500/20">
            <p className="text-xl md:text-2xl leading-relaxed text-white font-light italic mb-8">
              "Soy un proceso en construcción. Múltiples versiones que buscan reconocerse 
              en un mismo reflejo. Tal vez no me conozca del todo, pero en esa búsqueda 
              —entre mi imaginación, mi deseo de ayudar, mi mirada al futuro y mi libertad 
              de cambiar— existe la verdad de quién soy."
            </p>
            
            <div className="flex justify-center mb-6">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Lluvia de luz final */}
        {textRevealed && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-8 bg-gradient-to-b from-white/80 to-transparent rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  animation: `rain-light ${4 + Math.random() * 3}s linear infinite`,
                  animationDelay: `${Math.random() * 8}s`,
                  transform: `rotate(${Math.random() * 30 - 15}deg)`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        @keyframes rain-light {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(10deg); opacity: 0; }
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default Cinco;