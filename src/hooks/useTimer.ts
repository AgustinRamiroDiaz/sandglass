'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  isFlipped: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  flip: () => void;
  setDuration: (duration: number) => void;
  totalDuration: number;
}

export function useTimer(initialDuration: number = 180): UseTimerReturn {
  const [totalDuration, setTotalDuration] = useState(initialDuration);
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const has30SecondWarning = useRef(false);
  const has5SecondWarning = useRef(false);

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play beep sound using Web Audio API
  const playBeep = useCallback((frequency: number, duration: number) => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = Math.max(0, prev - 0.1);

          // 30 second warning
          if (newTime <= 30 && newTime > 29.9 && !has30SecondWarning.current) {
            has30SecondWarning.current = true;
            playBeep(800, 0.2);
            setTimeout(() => playBeep(800, 0.2), 250);
          }

          // 5 second warning
          if (newTime <= 5 && newTime > 4.9 && !has5SecondWarning.current) {
            has5SecondWarning.current = true;
            playBeep(1000, 0.15);
            setTimeout(() => playBeep(1000, 0.15), 200);
            setTimeout(() => playBeep(1000, 0.15), 400);
          }

          // Timer finished
          if (newTime === 0) {
            setIsRunning(false);
            playBeep(1200, 0.3);
            setTimeout(() => playBeep(1200, 0.3), 350);
            setTimeout(() => playBeep(1200, 0.5), 700);
          }

          return newTime;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, playBeep]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(totalDuration);
    setIsFlipped(false);
    has30SecondWarning.current = false;
    has5SecondWarning.current = false;
  }, [totalDuration]);

  const flip = useCallback(() => {
    setIsFlipped((prev) => !prev);
    setTimeRemaining(totalDuration - timeRemaining);
    has30SecondWarning.current = false;
    has5SecondWarning.current = false;
  }, [timeRemaining, totalDuration]);

  const setDuration = useCallback((duration: number) => {
    setTotalDuration(duration);
    setTimeRemaining(duration);
    setIsRunning(false);
    setIsFlipped(false);
    has30SecondWarning.current = false;
    has5SecondWarning.current = false;
  }, []);

  return {
    timeRemaining,
    isRunning,
    isFlipped,
    start,
    pause,
    reset,
    flip,
    setDuration,
    totalDuration,
  };
}
