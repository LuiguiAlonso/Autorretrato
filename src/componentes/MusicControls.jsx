import React, { useState } from 'react';
import { useMusic } from './MusicContext';

const MusicControls = () => {
  const { isPlaying, volume, isLoaded, hasUserInteracted, toggle, changeVolume } = useMusic();
  const [showControls, setShowControls] = useState(false);

  // No mostrar controles hasta que el audio esté cargado
  if (!isLoaded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón principal */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="w-14 h-14 bg-gradient-to-br from-purple-600/90 to-indigo-600/90 hover:from-purple-500/95 hover:to-indigo-500/95 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-purple-500/25 border border-purple-400/30"
        title="Controles de música"
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3l-1.5 5.5H5l4.5 3.5-1.5 5.5L12 14l4 3.5-1.5-5.5L19 8.5h-5.5L12 3z"/>
        </svg>
      </button>

      {/* Panel de controles expandido */}
      {showControls && (
        <div className="absolute bottom-16 right-0 bg-black/70 backdrop-blur-md rounded-xl p-5 min-w-[220px] border border-purple-300/30 shadow-2xl shadow-purple-500/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-purple-100 font-medium">Música Ambiental</span>
            </div>
          </div>

          {/* Botón play/pause principal */}
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={toggle}
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
              title={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Control de volumen */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-purple-200 font-medium">Volumen</label>
              <span className="text-xs text-purple-300">{Math.round(volume * 100)}%</span>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-purple-800/50 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Iconos de volumen */}
            <div className="flex items-center justify-between text-purple-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            </div>
          </div>

          {/* Indicador de estado */}
          {!hasUserInteracted && (
            <div className="mt-4 p-2 bg-yellow-900/40 rounded-lg border border-yellow-600/30">
              <p className="text-xs text-yellow-200 text-center">
                Haz clic en cualquier lugar para activar la música
              </p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(139, 92, 246, 0.4);
        }
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .slider::-webkit-slider-track {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default MusicControls;