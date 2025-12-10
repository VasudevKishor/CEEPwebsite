# Google Maps API Integration Guide

## Setup Instructions

### 1. Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API** (optional, for autocomplete features)
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

### 2. Add the API Key to Your Project

Open `/frontend/public/index.html` and replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places"></script>
```

Example:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrVs8VRcnF0k1Hq7C5X2Z8Q9Z8Q9Z8Q9&libraries=places"></script>
```

### 3. API Key Security (Important for Production)

For production websites, restrict your API key:

1. In Google Cloud Console, go to **Credentials**
2. Click on your API key
3. Under **Application restrictions**, select **HTTP referrers (web sites)**
4. Add your domain(s):
   - Example: `https://yourdomain.com/*`
   - Example: `https://www.yourdomain.com/*`

### 4. Component Features

The GoogleMap component (`/frontend/src/components/GoogleMap/GoogleMap.js`) includes:

- **Interactive map** with zoom controls
- **Location marker** with animation
- **Info window** displaying address details
- **Street view** and **satellite** view options
- **Responsive design** for mobile devices
- **Custom styling** with light theme

### 5. Customization

To modify the map location or appearance, edit the Contact.js file:

```javascript
<GoogleMap 
    latitude={13.1939}      // Current location: Anna Nagar, Chennai
    longitude={80.2109}
    zoom={15}
    markerTitle="CEEP - Centre for Energy, Environment & Productivity"
/>
```

**Available props:**
- `latitude` (number): Map center latitude
- `longitude` (number): Map center longitude
- `zoom` (number): Initial zoom level (1-21)
- `markerTitle` (string): Marker info window title

### 6. Testing

1. Start the development server: `npm start`
2. Navigate to the Contact page
3. You should see an interactive map showing the location

## Troubleshooting

**Map not displaying?**
- Verify your API key is correct
- Check that the Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for error messages
- Ensure your API key has no IP/referrer restrictions if testing locally

**Map showing as blank/grey?**
- Wait a few moments for the API to load
- Check your internet connection
- Try refreshing the page

**API errors?**
- Check Google Cloud Console for usage and errors
- Ensure billing is enabled on your Google Cloud project
