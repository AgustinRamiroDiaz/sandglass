'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface SandglassProps {
  timeRemaining: number;
  totalDuration: number;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function Sandglass({ timeRemaining, totalDuration, isFlipped, onFlip }: SandglassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate sand percentage
  const sandPercentage = timeRemaining / totalDuration;

  // Sand animation using canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw falling sand particles
    const particleCount = Math.floor(20 * (1 - sandPercentage));
    const centerX = width / 2;
    const neckY = height / 2;

    ctx.fillStyle = '#d4a574';

    // Draw particles falling through the neck
    for (let i = 0; i < particleCount; i++) {
      const offset = (Date.now() / 10 + i * 30) % 60;
      const x = centerX + (Math.sin(i) * 2);
      const y = neckY - 30 + offset;

      if (y < neckY + 30) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [sandPercentage]);

  return (
    <div className="relative flex items-center justify-center touch-none select-none">
      <motion.div
        animate={{ rotate: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="relative cursor-pointer"
        onClick={onFlip}
      >
        <svg
          width="300"
          height="400"
          viewBox="0 0 300 400"
          className="drop-shadow-2xl"
        >
          {/* Glass outline */}
          <defs>
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0e0e0" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#e0e0e0" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f4d5a6" />
              <stop offset="100%" stopColor="#d4a574" />
            </linearGradient>
          </defs>

          {/* Top bulb outline */}
          <ellipse
            cx="150"
            cy="80"
            rx="80"
            ry="60"
            fill="none"
            stroke="#333"
            strokeWidth="3"
          />

          {/* Bottom bulb outline */}
          <ellipse
            cx="150"
            cy="320"
            rx="80"
            ry="60"
            fill="none"
            stroke="#333"
            strokeWidth="3"
          />

          {/* Top bulb sides */}
          <line x1="70" y1="80" x2="90" y2="200" stroke="#333" strokeWidth="3" />
          <line x1="230" y1="80" x2="210" y2="200" stroke="#333" strokeWidth="3" />

          {/* Bottom bulb sides */}
          <line x1="90" y1="200" x2="70" y2="320" stroke="#333" strokeWidth="3" />
          <line x1="210" y1="200" x2="230" y2="320" stroke="#333" strokeWidth="3" />

          {/* Frame top */}
          <rect x="50" y="30" width="200" height="15" fill="#8B4513" stroke="#333" strokeWidth="2" rx="3" />

          {/* Frame bottom */}
          <rect x="50" y="355" width="200" height="15" fill="#8B4513" stroke="#333" strokeWidth="2" rx="3" />

          {/* Sand in top bulb */}
          <motion.ellipse
            cx="150"
            cy={isFlipped ? 320 : 80}
            rx="75"
            ry={sandPercentage * 55}
            fill="url(#sandGradient)"
            initial={false}
          />

          {/* Sand in bottom bulb */}
          <motion.ellipse
            cx="150"
            cy={isFlipped ? 80 : 320}
            rx="75"
            ry={(1 - sandPercentage) * 55}
            fill="url(#sandGradient)"
            initial={false}
          />

          {/* Glass shine effect */}
          <ellipse
            cx="120"
            cy="100"
            rx="30"
            ry="40"
            fill="url(#glassGradient)"
            opacity="0.4"
          />
          <ellipse
            cx="120"
            cy="300"
            rx="30"
            ry="40"
            fill="url(#glassGradient)"
            opacity="0.4"
          />
        </svg>

        {/* Canvas for falling sand particles */}
        <canvas
          ref={canvasRef}
          width="300"
          height="400"
          className="absolute top-0 left-0 pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
