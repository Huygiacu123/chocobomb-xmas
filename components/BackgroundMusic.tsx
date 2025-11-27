import React, { useState, useRef, useEffect } from 'react';
import { Pause, Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUSIC_PLAYLIST } from '../constants';

interface BackgroundMusicProps {
  shouldStart: boolean; // Trigger to start music after user interaction
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ shouldStart }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Initial Play Trigger
  useEffect(() => {
    if (shouldStart && audioRef.current && !hasError && MUSIC_PLAYLIST.length > 0) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((error) => {
            console.log("Autoplay prevented or load failed:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [shouldStart, hasError]);

  // Handle Track Switching
  useEffect(() => {
    if (audioRef.current && MUSIC_PLAYLIST.length > 0) {
      audioRef.current.src = MUSIC_PLAYLIST[currentTrackIndex];
      setHasError(false);
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.error("Playback error:", e);
            setIsPlaying(false);
            setHasError(true);
          });
        }
      }
    }
  }, [currentTrackIndex, isPlaying]);

  // Handle Play/Pause Toggle
  const togglePlay = () => {
    if (!audioRef.current || hasError) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Next Track
  const nextTrack = () => {
    if (MUSIC_PLAYLIST.length > 0) {
      setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_PLAYLIST.length);
      // Don't auto-set isPlaying here, rely on effect
    }
  };

  // Handle Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Error Handler
  const handleAudioError = (e: any) => {
    // Only show error if we actually tried to play valid playlist
    if (MUSIC_PLAYLIST.length > 0) {
      console.warn(`Cannot play track: ${MUSIC_PLAYLIST[currentTrackIndex]}.`, e);
      setHasError(true);
      setIsPlaying(false);
    }
  };

  if (MUSIC_PLAYLIST.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        onEnded={nextTrack}
        onError={handleAudioError}
        loop={false} 
        preload="auto"
      />

      <motion.div 
        layout
        className={`bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2 ${hasError ? 'border-red-400 bg-red-50' : ''}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <button
          onClick={togglePlay}
          disabled={hasError}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            hasError 
              ? 'bg-red-100 text-red-500 cursor-not-allowed' 
              : 'bg-brand-100 text-brand-600 hover:bg-brand-200'
          }`}
        >
          {isPlaying ? (
            <span className="relative">
               <Pause size={18} />
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </span>
          ) : (
            <Play size={18} className="ml-1" />
          )}
        </button>

        <AnimatePresence>
          {(isExpanded || isPlaying || hasError) && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center gap-1 overflow-hidden"
            >
              <div className="flex flex-col mx-2 min-w-[60px]">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${hasError ? 'text-red-500' : 'text-brand-500'}`}>
                  {hasError ? 'Lỗi File Nhạc' : 'Đang phát'}
                </span>
                <span className="text-xs text-gray-700 font-medium truncate max-w-[100px]">
                   {hasError ? 'K.tìm thấy file' : `Bài ${currentTrackIndex + 1}`}
                </span>
              </div>

              <button 
                onClick={nextTrack}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                title="Next Song"
              >
                <SkipForward size={16} />
              </button>
              
              <button 
                onClick={toggleMute}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};