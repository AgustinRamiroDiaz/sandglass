'use client';

import { useState } from 'react';
import { useTimer } from '@/hooks/useTimer';

const PRESET_DURATIONS = [
  { label: '1', value: 60 },
  { label: '3', value: 180 },
  { label: '5', value: 300 },
  { label: '10', value: 600 },
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
  const [showTutorial, setShowTutorial] = useState(false);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative">
      {/* Help Button */}
      <button
        onClick={() => setShowTutorial(true)}
        className="fixed top-4 right-4 p-4 bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg transition-all active:scale-95 z-10"
        title="Help"
        aria-label="Show tutorial"
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowTutorial(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                How to Use
              </h2>
              <button
                onClick={() => setShowTutorial(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-1">Flip Button</h3>
                <p className="text-sm">Use the flip button to swap the remaining time with the elapsed time, like flipping an hourglass.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Alerts</h3>
                <p className="text-sm">You'll receive alerts at 30 seconds and 5 seconds remaining.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Controls</h3>
                <p className="text-sm">Use the play button to start/pause, and the Reset button to return to your set duration.</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
            className="p-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg transition-all active:scale-95"
            title="Flip timer"
            aria-label="Flip timer"
          >
            <svg
              className="w-8 h-8"
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
          </button>
        </div>

        <div className="flex flex-wrap gap-3 justify-center w-full">
          <button
            onClick={isRunning ? pause : start}
            className="p-5 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold shadow-lg transition-all active:scale-95"
            title={isRunning ? 'Pause' : 'Start'}
            aria-label={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-6.518-3.761A1 1 0 007 8.382v7.236a1 1 0 001.234.975l6.518-3.761a1 1 0 000-1.664z"
                />
              </svg>
            )}
          </button>
          <button
            onClick={reset}
            disabled={isRunning}
            className={`px-8 py-3 rounded-full font-semibold shadow-lg transition-all min-w-[120px] ${
              isRunning
                ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white active:scale-95'
            }`}
          >
            Reset
          </button>
        </div>

        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Duration Presets
          </h2>
          <div className="flex gap-3 mb-4 justify-center">
            {PRESET_DURATIONS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setDuration(preset.value)}
                className={`w-16 h-16 rounded-full text-2xl font-bold transition-all active:scale-95 ${
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
      </main>
    </div>
  );
}
