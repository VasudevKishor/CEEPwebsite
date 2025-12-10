import React, { useEffect, useRef } from 'react';
import './GoogleMap.css';

const GoogleMap = ({ 
  latitude = 13.1939,  // Anna Nagar, Chennai
  longitude = 80.2109,
  zoom = 15,
  markerTitle = "CEEP - Centre for Energy, Environment & Productivity"
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (!window.google) {
      console.error('Google Maps API not loaded');
      return;
    }

    if (!mapContainerRef.current) return;

    const location = { lat: latitude, lng: longitude };

    // Create map
    mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
      zoom: zoom,
      center: location,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: true,
      zoomControl: true,
      gestureHandling: 'cooperative',
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#333333' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#c9c9c9' }]
        }
      ]
    });

    // Add marker
    markerRef.current = new window.google.maps.Marker({
      position: location,
      map: mapRef.current,
      title: markerTitle,
      animation: window.google.maps.Animation.DROP,
    });

    // Add info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #2563eb;">${markerTitle}</h3>
          <p style="margin: 0; font-size: 13px; color: #666;">
            1039, 26th St<br/>
            H Block, Ponni Colony<br/>
            Anna Nagar, Chennai 600040<br/>
            INDIA
          </p>
        </div>
      `,
    });

    markerRef.current.addListener('click', () => {
      infoWindow.open(mapRef.current, markerRef.current);
    });

    // Open info window by default
    infoWindow.open(mapRef.current, markerRef.current);

    return () => {
      infoWindow.close();
    };
  }, [latitude, longitude, zoom, markerTitle]);

  return (
    <div className="google-map-wrapper">
      <div ref={mapContainerRef} className="google-map-container"></div>
    </div>
  );
};

export default GoogleMap;
