'use client';

import { useState, useEffect } from 'react';
import { useTimer } from '@/hooks/useTimer';

const PRESET_DURATIONS = [
  { label: '1', value: 60 },
  { label: '3', value: 180 },
  { label: '5', value: 300 },
  { label: '10', value: 600 },
];

export default function Home() {
  const [customDuration, setCustomDuration] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [alertTimes, setAlertTimes] = useState<number[]>([30, 5]);
  const [alertFinish, setAlertFinish] = useState(true);
  const [newAlertTime, setNewAlertTime] = useState('');
  const [initialDuration, setInitialDuration] = useState(180);

  // Load configuration from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSoundsEnabled = localStorage.getItem('soundsEnabled');
      const savedAlertTimes = localStorage.getItem('alertTimes');
      const savedAlertFinish = localStorage.getItem('alertFinish');
      const savedDuration = localStorage.getItem('duration');

      if (savedSoundsEnabled !== null) {
        setSoundsEnabled(savedSoundsEnabled === 'true');
      }
      if (savedAlertTimes !== null) {
        try {
          const parsed = JSON.parse(savedAlertTimes);
          if (Array.isArray(parsed)) {
            setAlertTimes(parsed);
          }
        } catch (e) {
          console.error('Failed to parse alertTimes from localStorage', e);
        }
      }
      if (savedAlertFinish !== null) {
        setAlertFinish(savedAlertFinish === 'true');
      }
      if (savedDuration !== null) {
        const duration = parseInt(savedDuration);
        if (!isNaN(duration)) {
          setInitialDuration(duration);
        }
      }
    }
  }, []);

  // Save configuration to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundsEnabled', soundsEnabled.toString());
    }
  }, [soundsEnabled]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('alertTimes', JSON.stringify(alertTimes));
    }
  }, [alertTimes]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('alertFinish', alertFinish.toString());
    }
  }, [alertFinish]);

  const {
    timeRemaining,
    isRunning,
    start,
    pause,
    reset,
    flip,
    setDuration: setTimerDuration,
    totalDuration,
  } = useTimer(initialDuration, {
    enabled: soundsEnabled,
    alertTimes,
    alertFinish,
  });

  // Wrapper to save duration to localStorage
  const setDuration = (duration: number) => {
    setTimerDuration(duration);
    if (typeof window !== 'undefined') {
      localStorage.setItem('duration', duration.toString());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const getTimerColor = () => {
    const progress = timeRemaining / totalDuration;
    // Linear interpolation from green (rgb(34, 197, 94)) to red (rgb(239, 68, 68))
    const red = Math.round(34 + (239 - 34) * (1 - progress));
    const green = Math.round(197 - (197 - 68) * (1 - progress));
    const blue = Math.round(94 - (94 - 68) * (1 - progress));
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const handleCustomDuration = () => {
    const duration = parseInt(customDuration);
    if (!isNaN(duration) && duration > 0) {
      setDuration(duration * 60);
      setCustomDuration('');
    }
  };

  const handleAddAlertTime = () => {
    const time = parseInt(newAlertTime);
    if (!isNaN(time) && time > 0 && !alertTimes.includes(time)) {
      setAlertTimes([...alertTimes, time].sort((a, b) => b - a));
      setNewAlertTime('');
    }
  };

  const handleRemoveAlertTime = (time: number) => {
    setAlertTimes(alertTimes.filter((t) => t !== time));
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

      {/* Configuration Button */}
      <button
        onClick={() => setShowConfig(true)}
        className="fixed bottom-4 right-4 p-4 bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg transition-all active:scale-95 z-10"
        title="Configuration"
        aria-label="Show configuration"
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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
                <h3 className="font-semibold mb-1">Flip Timer</h3>
                <p className="text-sm">Click the timer display to flip it, swapping the remaining time with the elapsed time, like flipping an hourglass.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Sound Alerts</h3>
                <p className="text-sm">Configure custom sound alerts at any time intervals you choose in the configuration panel.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Controls</h3>
                <p className="text-sm">Use the play button to start/pause, and the Reset button to return to your set duration.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfig && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowConfig(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Configuration
              </h2>
              <button
                onClick={() => setShowConfig(false)}
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

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Duration Presets
                </h3>
                <div className="flex gap-3 justify-center mb-4">
                  {PRESET_DURATIONS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => {
                        setDuration(preset.value);
                        setShowConfig(false);
                      }}
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
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Custom Duration
                </h3>
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
                    onClick={() => {
                      handleCustomDuration();
                      setShowConfig(false);
                    }}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all active:scale-95"
                  >
                    Set
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Sound Alerts
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700 dark:text-gray-300">Enable Sounds</span>
                    <input
                      type="checkbox"
                      checked={soundsEnabled}
                      onChange={(e) => setSoundsEnabled(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                    />
                  </label>

                  {soundsEnabled && (
                    <>
                      <div className="pl-4 space-y-2">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Time Alerts (seconds remaining)
                        </div>
                        {alertTimes.length > 0 ? (
                          <div className="space-y-2">
                            {alertTimes.map((time) => (
                              <div
                                key={time}
                                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg"
                              >
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {time} second{time !== 1 ? 's' : ''}
                                </span>
                                <button
                                  onClick={() => handleRemoveAlertTime(time)}
                                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                  aria-label={`Remove ${time} second alert`}
                                >
                                  <svg
                                    className="w-5 h-5"
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
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            No time alerts configured
                          </p>
                        )}

                        <div className="flex gap-2 mt-3">
                          <input
                            type="number"
                            value={newAlertTime}
                            onChange={(e) => setNewAlertTime(e.target.value)}
                            placeholder="Add alert (seconds)"
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            min="1"
                          />
                          <button
                            onClick={handleAddAlertTime}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all active:scale-95"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      <label className="flex items-center justify-between cursor-pointer pl-4 pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Timer Finished Alert</span>
                        <input
                          type="checkbox"
                          checked={alertFinish}
                          onChange={(e) => setAlertFinish(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex flex-col items-center gap-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100 text-center">
          Sandglass Timer
        </h1>

        <button
          onClick={flip}
          className="flex items-center justify-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-none min-h-[33vh]"
          title="Click to flip timer"
          aria-label="Flip timer"
        >
          <svg
            className="w-10 h-10 text-gray-400 dark:text-gray-500"
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

          <div
            className="text-7xl font-mono font-bold tabular-nums transition-colors duration-300"
            style={{ color: getTimerColor() }}
          >
            {formatTime(timeRemaining)}
          </div>

          <svg
            className="w-10 h-10 text-gray-400 dark:text-gray-500"
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
      </main>
    </div>
  );
}
