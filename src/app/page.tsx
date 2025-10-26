'use client';

import { useState } from 'react';
import { useTimer } from '@/hooks/useTimer';

const PRESET_DURATIONS = [
  { label: '1 min', value: 60 },
  { label: '3 min', value: 180 },
  { label: '5 min', value: 300 },
  { label: '10 min', value: 600 },
];

export default function Home() {
  const {
    timeRemaining,
    isRunning,
    isFlipped,
    start,
    pause,
    reset,
    flip,
    setDuration,
    totalDuration,
  } = useTimer(180);

  const [customDuration, setCustomDuration] = useState('');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const handleCustomDuration = () => {
    const duration = parseInt(customDuration);
    if (!isNaN(duration) && duration > 0) {
      setDuration(duration * 60);
      setCustomDuration('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <main className="flex flex-col items-center gap-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100 text-center">
          Sandglass Timer
        </h1>

        <div className="flex flex-col items-center gap-6">
          <div className="text-7xl font-mono font-bold text-amber-900 dark:text-amber-100 tabular-nums">
            {formatTime(timeRemaining)}
          </div>

          <button
            onClick={flip}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg transition-all active:scale-95"
            title="Flip timer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            Flip
          </button>
        </div>

        <div className="flex flex-wrap gap-3 justify-center w-full">
          <button
            onClick={isRunning ? pause : start}
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold shadow-lg transition-all active:scale-95 min-w-[120px]"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-semibold shadow-lg transition-all active:scale-95 min-w-[120px]"
          >
            Reset
          </button>
        </div>

        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Duration Presets
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {PRESET_DURATIONS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setDuration(preset.value)}
                className={`px-4 py-3 rounded-lg font-medium transition-all active:scale-95 ${
                  totalDuration === preset.value
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              placeholder="Custom (minutes)"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              min="1"
            />
            <button
              onClick={handleCustomDuration}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all active:scale-95"
            >
              Set
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>Use the Flip button to swap remaining time</p>
          <p>Alerts at 30s and 5s remaining</p>
        </div>
      </main>
    </div>
  );
}
