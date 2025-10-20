# Sandglass Timer

A beautiful, mobile-first sandglass timer application built with Next.js, featuring smooth animations and sound notifications.

## Features

- **Visual Sandglass Animation**: Watch the sand flow through an animated hourglass
- **Flip Functionality**: Tap the sandglass to flip it and reverse the timer
- **Configurable Duration**: Choose from presets (1, 3, 5, 10 minutes) or set a custom duration
- **Sound Notifications**:
  - 30 seconds remaining: Double beep
  - 5 seconds remaining: Triple beep
  - Timer complete: Final notification
- **Mobile-First Design**: Optimized for mobile devices with touch interactions
- **Dark Mode Support**: Automatically adapts to system preferences
- **Smooth Animations**: Powered by Framer Motion

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Set Duration**: Choose a preset duration or enter a custom time in minutes
2. **Start Timer**: Click the "Start" button to begin the countdown
3. **Flip**: Tap the sandglass to flip it and restart with remaining time reversed
4. **Pause**: Click "Pause" to stop the timer
5. **Reset**: Click "Reset" to return to the initial duration

## Technology Stack

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Styling
- **Framer Motion**: Smooth animations
- **Web Audio API**: Sound notifications

## Project Structure

```
sandglass/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Main timer page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── Sandglass.tsx   # Sandglass visual component
│   └── hooks/
│       └── useTimer.ts     # Timer logic hook
├── package.json
└── README.md
```

## Build

To create a production build:

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT
