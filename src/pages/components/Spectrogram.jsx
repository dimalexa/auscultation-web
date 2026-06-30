// src/components/AudioSpectrogram.jsx
// src/components/AudioSpectrogram.jsx
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';

const AudioSpectrogram = forwardRef(({ url, onPlay, onPause, onFinish, isLooping = false }, ref) => {
  const waveformRef = useRef(null);
  const spectrogramRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.play();
        setIsPlaying(true);
      }
    },
    pause: () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.pause();
        setIsPlaying(false);
      }
    },
    stop: () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.stop();
        setIsPlaying(false);
      }
    },
    togglePlayPause: () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.playPause();
        setIsPlaying(!isPlaying);
      }
    },
    isPlaying: () => isPlaying,
    getCurrentTime: () => wavesurferRef.current?.getCurrentTime() || 0,
    getDuration: () => wavesurferRef.current?.getDuration() || 0,
  }), [isPlaying]);

  const createPlayer = (audioUrl) => {
    if (!waveformRef.current || !spectrogramRef.current) return;

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }

    setIsLoading(true);

    try {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        height: 100,
        waveColor: 'rgb(57, 63, 138)',
        progressColor: '#FFD700',     // Золотой для прогресса
        cursorColor: '#FF4500',       // Яркая палочка
        cursorWidth: 2,
        url: audioUrl,
        plugins: [
          Spectrogram.create({
            container: spectrogramRef.current,
            labels: false,
            height: 50,
            fftSamples: 1024,
            frequencyMax: 1000,
            gainDB: 10
          }),
        ],
      });

      ws.on('ready', () => {
        setIsLoading(false);
        console.log('Spectrogram ready for:', audioUrl);
        if (onPlay) onPlay();
      });

      ws.on('play', () => {
        setIsPlaying(true);
        if (onPlay) onPlay();
      });

      ws.on('pause', () => {
        setIsPlaying(false);
        if (onPause) onPause();
      });

      ws.on('finish', () => {
        setIsPlaying(false);
        if (onFinish) {
          onFinish();
        }
      });

      ws.on('error', (error) => {
        console.error('WaveSurfer error:', error);
        setIsLoading(false);
      });

      wavesurferRef.current = ws;
    } catch (error) {
      console.error('Failed to create player:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      createPlayer(url);
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [url]);

  return (
    <div className="audio-spectrogram">
      {isLoading && <div className="loading">Загрузка...</div>}
      <div ref={waveformRef} className="waveform-container" />
      <div 
        ref={spectrogramRef} 
        className="spectrogram-container"
        style={{ 
          minHeight: '50px',
          backgroundColor: '#f3f4f6',
          marginTop: '10px',
          borderRadius: '4px'
        }} 
      />
    </div>
  );
});

AudioSpectrogram.displayName = 'AudioSpectrogram';

export default AudioSpectrogram;