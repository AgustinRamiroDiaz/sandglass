# Sandglass Timer ⏳

A sleek, mobile-focused timer application with a unique flip mechanic, originally designed for the board game **Magic Maze**.

## ✨ Features

### Core Functionality
- **Flip Timer**: Click the timer display to flip it, swapping remaining time with elapsed time - just like flipping a physical sandglass
- **Visual Feedback**: Timer color gradually transitions from green to red as time runs out
- **Preset Durations**: Quick access to 1, 3, 5, and 10-minute timers
- **Custom Durations**: Set any custom duration in minutes

### Sound Alerts
- **Configurable Time Alerts**: Add custom sound alerts at any time interval (e.g., 30s, 15s, 5s)
- **Finish Alert**: Optional sound notification when timer completes
- **Master Control**: Enable/disable all sounds with a single toggle

### User Experience
- **Persistent Settings**: All configurations saved to localStorage
- **Mobile-Optimized**: Large touch targets and responsive design
- **Dark Mode Support**: Seamless light/dark theme support
- **Minimal Interface**: Clean UI with configuration tucked away in a modal

## 🎮 Magic Maze Connection

This timer was originally designed for the cooperative board game [Magic Maze](https://boardgamegeek.com/boardgame/209778/magic-maze), which uses a sandglass timer as a core game mechanic. Players can flip the sandglass to add more time, and this app replicates that experience digitally with added customization options.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AgustinRamiroDiaz/sandglass.git

# Navigate to the project directory
cd sandglass

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with Turbopack
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling
- **Web Audio API** - Sound generation

## 🎨 UI Components

### Main Timer Display
- Large, clickable timer with color gradient
- Flip icons on both sides
- 1/3 viewport height for prominence

### Control Buttons
- **Play/Pause**: Icon-only round button with play/pause states
- **Reset**: Disabled during active countdown
- **Help**: Access tutorial and Magic Maze information
- **Configuration**: Manage durations and sound alerts
- **GitHub**: Link to source code repository

## ⚙️ Configuration

All settings persist across sessions:
- Timer duration
- Sound enable/disable
- Custom alert times
- Finish alert preference

## 📱 Mobile-First Design

- Icon-only buttons for flip and play/pause actions
- Large touch-friendly timer display
- Collapsible configuration panel
- Optimized for vertical mobile screens

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Repository**: [github.com/AgustinRamiroDiaz/sandglass](https://github.com/AgustinRamiroDiaz/sandglass)
- **Magic Maze**: [BoardGameGeek](https://boardgamegeek.com/boardgame/209778/magic-maze)

---

Made with ❤️ for board game enthusiasts
