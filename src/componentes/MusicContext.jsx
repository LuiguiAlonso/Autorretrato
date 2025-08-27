import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic debe usarse dentro de MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Volumen inicial bajo para ambiente
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    // Crear el elemento de audio
    audioRef.current = new Audio('/music/background.mp3'); // Cambia por el nombre de tu archivo
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current.preload = 'auto';

    // Eventos del audio
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      // Intentar reproducir inmediatamente cuando esté listo
      tryAutoPlay();
    });

    audioRef.current.addEventListener('play', () => {
      setIsPlaying(true);
    });

    audioRef.current.addEventListener('pause', () => {
      setIsPlaying(false);
    });

    // Función para intentar autoplay
    const tryAutoPlay = async () => {
      if (audioRef.current && isLoaded) {
        try {
          await audioRef.current.play();
          setHasUserInteracted(true);
          console.log('Música iniciada automáticamente');
        } catch (error) {
          console.log('Autoplay bloqueado, esperando interacción del usuario');
        }
      }
    };

    // Detector de primera interacción del usuario (más agresivo)
    const handleFirstInteraction = async () => {
      if (!hasUserInteracted && audioRef.current) {
        setHasUserInteracted(true);
        try {
          await audioRef.current.play();
          console.log('Música iniciada por interacción del usuario');
        } catch (error) {
          console.log('Error al iniciar música:', error);
        }
      }
    };

    // Intentar autoplay inmediatamente
    setTimeout(tryAutoPlay, 500);

    // Agregar listeners para múltiples tipos de interacción
    const events = ['click', 'keydown', 'touchstart', 'mousedown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [volume]);

  const play = async () => {
    if (audioRef.current && isLoaded) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error al reproducir música:', error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <MusicContext.Provider value={{
      isPlaying,
      volume,
      isLoaded,
      hasUserInteracted,
      play,
      pause,
      toggle,
      changeVolume
    }}>
      {children}
    </MusicContext.Provider>
  );
};