// src/components/MapChart.js
import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const isPrivateIP = (ip) => {
  const parts = ip.split('.').map(Number);
  return (
    parts[0] === 10 ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168)
  );
};

const MapChart = ({ data }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchGeoData = async () => {
      const newMarkers = await Promise.all(
        data.map(async item => {
          if (isPrivateIP(item.src_ip)) {
            console.warn(`Skipping private IP address: ${item.src_ip}`);
            return null;
          }

          try {
            const response = await fetch(`https://ipinfo.io/${item.src_ip}?token=a1805196a40068`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const geo = await response.json();
            console.log('Geo Data:', geo);  // Debugging: Log geo data
            if (geo && geo.loc) {
              const [lat, lon] = geo.loc.split(',');
              return {
                coordinates: [parseFloat(lon), parseFloat(lat)],
                label: item.prediction,
              };
            }
          } catch (error) {
            console.error('Error fetching geo data:', error);  // Debugging: Log errors
          }
          return null;
        })
      );
      setMarkers(newMarkers.filter(marker => marker !== null));
    };

    fetchGeoData();
  }, [data]);

  console.log('Markers:', markers);  // Debugging: Log markers data

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: { fill: "#D6D6DA", stroke: "#FFFFFF", strokeWidth: 0.75, outline: "none" },
                hover: { fill: "#F53", stroke: "#FFFFFF", strokeWidth: 0.75, outline: "none" },
                pressed: { fill: "#E42", stroke: "#FFFFFF", strokeWidth: 0.75, outline: "none" }
              }}
            />
          ))
        }
      </Geographies>
      {markers.map(({ coordinates, label }, index) => (
        <Marker key={index} coordinates={coordinates}>
          <circle r={10} fill="#FF5533" stroke="#fff" strokeWidth={2} />
          <text textAnchor="middle" y={-20} style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontWeight: "bold", fontSize: 12 }}>
            {label}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChart;
