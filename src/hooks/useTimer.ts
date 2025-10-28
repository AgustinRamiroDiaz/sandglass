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

interface SoundConfig {
  enabled: boolean;
  alertTimes: number[];
  alertFinish: boolean;
}

export function useTimer(
  initialDuration: number = 180,
  soundConfig: SoundConfig = { enabled: true, alertTimes: [30, 5], alertFinish: true }
): UseTimerReturn {
  const [totalDuration, setTotalDuration] = useState(initialDuration);
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const triggeredAlerts = useRef<Set<number>>(new Set());

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

          // Check for configurable time alerts
          if (soundConfig.enabled) {
            soundConfig.alertTimes.forEach((alertTime) => {
              if (newTime <= alertTime && newTime > alertTime - 0.1 && !triggeredAlerts.current.has(alertTime)) {
                triggeredAlerts.current.add(alertTime);
                // Double beep for alerts
                playBeep(800, 0.2);
                setTimeout(() => playBeep(800, 0.2), 250);
              }
            });
          }

          // Timer finished
          if (newTime === 0) {
            setIsRunning(false);
            if (soundConfig.enabled && soundConfig.alertFinish) {
              playBeep(1200, 0.3);
              setTimeout(() => playBeep(1200, 0.3), 350);
              setTimeout(() => playBeep(1200, 0.5), 700);
            }
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
  }, [isRunning, timeRemaining, playBeep, soundConfig.enabled, soundConfig.alertTimes, soundConfig.alertFinish]);

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
    triggeredAlerts.current.clear();
  }, [totalDuration]);

  const flip = useCallback(() => {
    setIsFlipped((prev) => !prev);
    setTimeRemaining(totalDuration - timeRemaining);
    triggeredAlerts.current.clear();
  }, [timeRemaining, totalDuration]);

  const setDuration = useCallback((duration: number) => {
    setTotalDuration(duration);
    setTimeRemaining(duration);
    setIsRunning(false);
    setIsFlipped(false);
    triggeredAlerts.current.clear();
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
