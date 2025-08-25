import React, { useEffect, useState } from 'react';

const Tres = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setImageLoaded(true), 800);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-purple-900 overflow-hidden relative">
      {/* Partículas de energía */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.4,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Rayos de luz de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-red-400/8 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* Imagen SVG de las manos sosteniendo el peso */}
        <div 
          className={`relative w-full max-w-4xl h-[400px] mb-16 transition-all duration-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <svg viewBox="0 0 800 400" className="w-full h-full">
            {/* Definiciones para gradientes y efectos */}
            <defs>
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 215, 0, 0.8)" />
                <stop offset="50%" stopColor="rgba(255, 165, 0, 0.6)" />
                <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
              </radialGradient>
              
              <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              <linearGradient id="handGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#fdba74" />
              </linearGradient>

              <linearGradient id="handGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>

              <linearGradient id="handGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>

              <linearGradient id="handGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fecaca" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>

              <linearGradient id="handGradient5" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbcfe8" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>

              {/* Filtro de brillo para la mano principal */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Peso/Carga central */}
            <g className={`transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <rect x="300" y="80" width="200" height="80" rx="8" fill="url(#weightGradient)" stroke="#94a3b8" strokeWidth="2"/>
              <rect x="305" y="85" width="190" height="10" rx="5" fill="rgba(226, 232, 240, 0.3)"/>
              <text x="400" y="130" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">EQUIPO</text>
            </g>

            {/* Cuerdas conectando el peso con las manos */}
            <g className={`transition-all duration-1200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <line x1="340" y1="160" x2="180" y2="280" stroke="#b45309" strokeWidth="3" opacity="0.8"/>
              <line x1="370" y1="160" x2="280" y2="280" stroke="#b45309" strokeWidth="3" opacity="0.8"/>
              <line x1="400" y1="160" x2="400" y2="280" stroke="#b45309" strokeWidth="4" opacity="1"/>
              <line x1="430" y1="160" x2="520" y2="280" stroke="#b45309" strokeWidth="3" opacity="0.8"/>
              <line x1="460" y1="160" x2="620" y2="280" stroke="#b45309" strokeWidth="3" opacity="0.8"/>
            </g>

            {/* Manos sosteniendo (de izquierda a derecha) */}
            
            {/* Mano 1 */}
            <g className={`transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
               style={{animationDelay: '0.2s'}}>
              <ellipse cx="180" cy="320" rx="35" ry="50" fill="url(#handGradient1)" transform="rotate(-15 180 320)"/>
              <ellipse cx="180" cy="285" rx="20" ry="35" fill="url(#handGradient1)" transform="rotate(-15 180 285)"/>
              <ellipse cx="170" cy="265" rx="8" ry="20" fill="url(#handGradient1)" transform="rotate(-20 170 265)"/>
              <ellipse cx="180" cy="260" rx="8" ry="22" fill="url(#handGradient1)" transform="rotate(-15 180 260)"/>
              <ellipse cx="190" cy="262" rx="8" ry="20" fill="url(#handGradient1)" transform="rotate(-10 190 262)"/>
              <ellipse cx="195" cy="268" rx="7" ry="18" fill="url(#handGradient1)" transform="rotate(-5 195 268)"/>
            </g>

            {/* Mano 2 */}
            <g className={`transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
               style={{animationDelay: '0.4s'}}>
              <ellipse cx="280" cy="320" rx="35" ry="50" fill="url(#handGradient2)" transform="rotate(-8 280 320)"/>
              <ellipse cx="280" cy="285" rx="20" ry="35" fill="url(#handGradient2)" transform="rotate(-8 280 285)"/>
              <ellipse cx="270" cy="265" rx="8" ry="20" fill="url(#handGradient2)" transform="rotate(-12 270 265)"/>
              <ellipse cx="280" cy="260" rx="8" ry="22" fill="url(#handGradient2)" transform="rotate(-8 280 260)"/>
              <ellipse cx="290" cy="262" rx="8" ry="20" fill="url(#handGradient2)" transform="rotate(-4 290 262)"/>
              <ellipse cx="295" cy="268" rx="7" ry="18" fill="url(#handGradient2)" transform="rotate(0 295 268)"/>
            </g>

            {/* Mano 3 - PRINCIPAL (con brillo) */}
            <g className={`transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
               style={{animationDelay: '0.6s'}}>
              {/* Efecto de brillo */}
              <circle cx="400" cy="300" r="80" fill="url(#glowGradient)" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
              </circle>
              
              <ellipse cx="400" cy="320" rx="40" ry="55" fill="url(#handGradient2)" filter="url(#glow)"/>
              <ellipse cx="400" cy="280" rx="22" ry="38" fill="url(#handGradient2)" filter="url(#glow)"/>
              <ellipse cx="390" cy="255" rx="9" ry="22" fill="url(#handGradient2)" filter="url(#glow)"/>
              <ellipse cx="400" cy="250" rx="9" ry="25" fill="url(#handGradient2)" filter="url(#glow)"/>
              <ellipse cx="410" cy="252" rx="9" ry="22" fill="url(#handGradient2)" filter="url(#glow)"/>
              <ellipse cx="415" cy="258" rx="8" ry="20" fill="url(#handGradient2)" filter="url(#glow)"/>
              
              {/* Partículas de energía alrededor */}
              <circle cx="360" cy="280" r="3" fill="#fbbf24" opacity="0.8">
                <animate attributeName="cy" values="280;260;280" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="440" cy="290" r="2" fill="#f59e0b" opacity="0.8">
                <animate attributeName="cx" values="440;460;440" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="380" cy="340" r="2" fill="#fbbf24" opacity="0.8">
                <animate attributeName="cy" values="340;320;340" dur="1.8s" repeatCount="indefinite"/>
              </circle>
            </g>

            {/* Mano 4 */}
            <g className={`transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
               style={{animationDelay: '0.8s'}}>
              <ellipse cx="520" cy="320" rx="35" ry="50" fill="url(#handGradient4)" transform="rotate(12 520 320)"/>
              <ellipse cx="520" cy="285" rx="20" ry="35" fill="url(#handGradient4)" transform="rotate(12 520 285)"/>
              <ellipse cx="510" cy="265" rx="8" ry="20" fill="url(#handGradient4)" transform="rotate(8 510 265)"/>
              <ellipse cx="520" cy="260" rx="8" ry="22" fill="url(#handGradient4)" transform="rotate(12 520 260)"/>
              <ellipse cx="530" cy="262" rx="8" ry="20" fill="url(#handGradient4)" transform="rotate(16 530 262)"/>
              <ellipse cx="535" cy="268" rx="7" ry="18" fill="url(#handGradient4)" transform="rotate(20 535 268)"/>
            </g>

            {/* Mano 5 */}
            <g className={`transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
               style={{animationDelay: '1.0s'}}>
              <ellipse cx="620" cy="320" rx="35" ry="50" fill="url(#handGradient5)" transform="rotate(20 620 320)"/>
              <ellipse cx="620" cy="285" rx="20" ry="35" fill="url(#handGradient5)" transform="rotate(20 620 285)"/>
              <ellipse cx="610" cy="265" rx="8" ry="20" fill="url(#handGradient5)" transform="rotate(16 610 265)"/>
              <ellipse cx="620" cy="260" rx="8" ry="22" fill="url(#handGradient5)" transform="rotate(20 620 260)"/>
              <ellipse cx="630" cy="262" rx="8" ry="20" fill="url(#handGradient5)" transform="rotate(24 630 262)"/>
              <ellipse cx="635" cy="268" rx="7" ry="18" fill="url(#handGradient5)" transform="rotate(28 635 268)"/>
            </g>
          </svg>
        </div>

        {/* Texto principal */}
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1200 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-300/20 shadow-xl shadow-orange-500/10">
            <p className="text-lg md:text-xl text-orange-50 leading-relaxed mb-6 font-light">
              Cuando me siento capaz de hacer algo, me gusta ayudar. Ponerme el equipo al hombro 
              me recuerda que lo importante no es solo lo que yo sé, sino lo que construimos juntos.
            </p>
            <p className="text-lg md:text-xl text-orange-100 leading-relaxed italic">
              Creo que el verdadero cambio nace cuando trabajamos por algo más grande que nosotros mismos.
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
            onClick={() => window.location.href = '/dos'}
            className="group bg-orange-600/20 hover:bg-orange-500/30 border border-orange-400/30 hover:border-orange-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-orange-200 group-hover:text-orange-100">
              <svg className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 12 12">
                <path d="M7.5 9l-3-3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              <span>Anterior</span>
            </div>
          </button>
          
          <button 
            onClick={() => window.location.href = '/cuatro'}
            className="group bg-orange-600/20 hover:bg-orange-500/30 border border-orange-400/30 hover:border-orange-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-orange-200 group-hover:text-orange-100">
              <span>Siguiente</span>
              <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 12 12">
                <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default Tres;