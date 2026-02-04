# Aaron Feleke Portfolio - React App

A modern React portfolio website built with Vite, featuring responsive design, dark mode, and real-time room counting for various projects.

## Features

- **Modern React Architecture**: Built with React 18 and Vite for fast development
- **Responsive Design**: Mobile-first design with breakpoints for tablet and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Room counts update every 5 minutes automatically
- **CSS Modules**: Component-scoped styling for better maintainability
- **React Router**: Client-side routing for multiple pages

## Tech Stack

- **Frontend**: React 18, CSS Modules, React Router DOM
- **Build Tool**: Vite
- **Styling**: CSS Modules with responsive design
- **State Management**: React Hooks (useState, useEffect, useContext)
- **API**: Fetch API for room count endpoints

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── Header/          # Site header with profile info
│   ├── ProjectTile/     # Individual project cards
│   └── RoomCountIndicator/ # Room count badges
├── pages/               # Route components
│   ├── Home/           # Main portfolio page
│   ├── Ejection/       # Red card report page
│   ├── Map/            # Wuhu Island map page
│   ├── Offside/        # Offside quiz page
│   └── Board/          # Jeopardy board editor page
├── contexts/           # React contexts
│   └── ThemeContext.jsx # Dark mode theme management
├── hooks/              # Custom React hooks
│   └── useRoomCounts.js # Room count API hook
├── services/           # API services
│   └── api.js          # Room count API calls
└── App.jsx             # Main app component with routing
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the react-app folder:
   ```bash
   cd react-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## API Integration

The app integrates with buzzin.feleke.xyz API endpoints:

- `/buzzInCount` - Tip of the Tongue room count
- `/geoCount` - City Wanderer room count  
- `/wiiInspectCount` - Wii Inspect room count

Room counts are fetched on page load and refresh every 5 minutes automatically.

## Deployment

### For GitHub Pages:

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist` folder contains the built application ready for deployment

### For Other Hosting:

The built files in the `dist` folder can be deployed to any static hosting service like Netlify, Vercel, or traditional web hosting.

## Component Guide

### Header Component
- Contains profile information, social media links, and theme toggle
- Sticky positioning on desktop screens (≥1086px)
- Responsive image display

### ProjectTile Component  
- Reusable project card component
- Supports room count indicators
- Handles both internal and external navigation
- Responsive sizing based on screen width

### RoomCountIndicator Component
- Displays room count badges when count > 0
- Links to visual dashboard
- Automatic pluralization

## Migrated Features

All original Jekyll site features have been migrated:

- ✅ Responsive portfolio layout
- ✅ Dark mode toggle
- ✅ Real-time room counting for projects
- ✅ Social media integration
- ✅ Project tiles with hover effects
- ✅ Books section with Goodreads integration
- ✅ Google Analytics
- ✅ All original styling and animations

## Browser Support

- Chrome/Chromium-based browsers
- Firefox
- Safari
- Edge

## Contributing

This is a personal portfolio project. For suggestions or bug reports, please open an issue.

## License

This project is licensed under the MIT License.