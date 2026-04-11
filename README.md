# CEEP Website

A modern, high-performance static website for the Centre for Energy, Environment and Productivity (CEEP). This is a purely frontend React application designed for speed, rich multimedia delivery, and premium aesthetics.

## Features

- **Cinematic Presentation**: Hero sections with high-quality video and smooth GSAP animations.
- **Project Showcase**: Interactive video gallery of successful case studies.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Premium Aesthetics**: Glassmorphism, tailored color palettes, and modern typography.

## Tech Stack

- **Framework**: React 18
- **Animations**: GSAP (GreenSock), Framer Motion, Lenis (Smooth Scroll)
- **3D & Graphics**: Three.js, React Three Fiber
- **Styling**: Vanilla CSS3 with modern design tokens

## Project Structure

```
CEEPweb/
├── public/          # Static assets (High-quality images, videos, PDFs)
├── src/
│   ├── components/  # Reusable UI components (Hero, Navbar, Gallery, etc.)
│   ├── pages/       # Page layouts (Home, Company, Services, CaseStudies)
│   ├── contexts/    # State management (Theme, etc.)
│   └── utils/       # Animation and helper utilities
├── package.json     # Project dependencies and scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:
```bash
npm start
```
The site will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

To create an optimized production build:
```bash
npm run build
```
The production-ready files will be in the `build/` directory.

---

© 2024 by CEEP Team. All rights reserved.
