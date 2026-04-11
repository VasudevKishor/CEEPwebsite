# Windmill Animation Component

A reusable React component that displays a smooth, continuous windmill animation inspired by leitwind.com.

## Features

- ✅ Clean, modern, minimal wind turbine design
- ✅ SVG-based graphics (scalable, crisp, lightweight)
- ✅ Smooth infinite rotation animation
- ✅ Responsive speed adjustment (slower on mobile)
- ✅ Optional pause on scroll
- ✅ Dark theme support
- ✅ Entrance fade-in animation
- ✅ Shadow animation
- ✅ Hover effects

## Installation

The component is already integrated into the project. Import it in any component:

```jsx
import Windmill from '../components/Windmill/Windmill';
```

## Usage

### Basic Usage

```jsx
<Windmill />
```

### With Custom Props

```jsx
<Windmill 
  speed={6}           // Rotation speed in seconds (lower = faster)
  size="large"        // 'small', 'medium', or 'large'
  autoStart={true}    // Start animation immediately
  pauseOnScroll={true} // Pause when not in viewport
  className="my-class" // Additional CSS classes
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | number | 8 | Rotation speed in seconds (lower = faster rotation) |
| `size` | string | 'medium' | Size: 'small', 'medium', or 'large' |
| `autoStart` | boolean | true | Whether to start animation immediately |
| `pauseOnScroll` | boolean | false | Pause animation when not in viewport |
| `className` | string | '' | Additional CSS classes |

## Customization

### Changing Rotation Speed

**Via Props:**
```jsx
<Windmill speed={4} /> // Faster (4 seconds per rotation)
<Windmill speed={12} /> // Slower (12 seconds per rotation)
```

**Via CSS Variable:**
```css
.windmill-container {
  --rotation-speed: 6s;
}
```

### Changing Blade Size or Colors

**Blade Colors:**
Edit the `#bladeGradient` in `Windmill.js`:
```jsx
<linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" stopColor="#your-color" />
  <stop offset="50%" stopColor="#your-color" />
  <stop offset="100%" stopColor="#your-color" />
</linearGradient>
```

**Blade Size:**
Adjust in `Windmill.css`:
```css
.windmill-blades {
  width: 200px;  /* Change this */
  height: 200px; /* Change this */
}
```

**Tower Colors:**
Edit the `#towerGradient` in `Windmill.js`:
```jsx
<linearGradient id="towerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stopColor="#your-color" />
  <stop offset="50%" stopColor="#your-color" />
  <stop offset="100%" stopColor="#your-color" />
</linearGradient>
```

### Changing Hub Colors

Edit the circle fills in the hub SVG:
```jsx
<circle cx="30" cy="30" r="25" fill="#your-color" />
<circle cx="30" cy="30" r="18" fill="#your-color" />
<circle cx="30" cy="30" r="8" fill="#your-color" />
```

## Integration Examples

### Embed on Any Page

```jsx
import Windmill from '../components/Windmill/Windmill';

function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <Windmill speed={6} size="medium" />
    </div>
  );
}
```

### Control Rotation Speed via JavaScript

```jsx
import { useState } from 'react';
import Windmill from '../components/Windmill/Windmill';

function MyComponent() {
  const [speed, setSpeed] = useState(8);

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  return (
    <div>
      <button onClick={() => handleSpeedChange(4)}>Fast</button>
      <button onClick={() => handleSpeedChange(8)}>Normal</button>
      <button onClick={() => handleSpeedChange(12)}>Slow</button>
      <Windmill speed={speed} />
    </div>
  );
}
```

### Start/Stop Animation on Scroll

```jsx
<Windmill 
  autoStart={true}
  pauseOnScroll={true}  // Pauses when not visible
/>
```

## Animation Details

### How the Animation Works

1. **Blades Container**: The `.windmill-blades` container rotates continuously using CSS `@keyframes rotateBlades`
2. **Individual Blades**: Three blades are positioned at 0°, 120°, and 240° within the rotating container
3. **Speed Control**: Controlled via CSS custom property `--rotation-speed`
4. **State Control**: Animation play state controlled via `--animation-state` (running/paused)

### Performance

- Uses CSS transforms (GPU-accelerated)
- No JavaScript animation loops
- Smooth 60fps on modern browsers
- Responsive speed adjustment for mobile devices

## Optional Enhancements

The component includes:
- ✅ Entrance fade-in animation
- ✅ Shadow pulse animation
- ✅ Hover effects (slight lift and speed increase)
- ✅ Dark theme support
- ✅ Responsive sizing

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS transforms and animations required
- SVG support required

## File Structure

```
components/Windmill/
├── Windmill.js      # Component logic
├── Windmill.css     # Styles and animations
└── README.md        # This file
```

