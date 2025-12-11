"use client";

import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl/mapbox-legacy";
import Image from "next/image";

const cities = [
  {
    name: "New York City",
    coordinates: [-74.0059, 40.7128],
    conference: "CHI Conference",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face&auto=format",
  },
  {
    name: "Washington DC",
    coordinates: [-77.0369, 38.9072],
    conference: "CSCW",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format",
  },
  {
    name: "Helsinki",
    coordinates: [24.9384, 60.1699],
    conference: "MobileHCI",
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=48&h=48&fit=crop&crop=face&auto=format",
  },
  {
    name: "Tokyo",
    coordinates: [139.6917, 35.6895],
    conference: "UIST",
    imageUrl:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=48&h=48&fit=crop&crop=face&auto=format",
  },
  {
    name: "Rome",
    coordinates: [12.4964, 41.9028],
    conference: "DIS",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&fit=crop&crop=face&auto=format",
  },
  {
    name: "Paris",
    coordinates: [2.3522, 48.8566],
    conference: "IUI",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=48&h=48&fit=crop&crop=face&auto=format",
  },
  {
    name: "San Francisco",
    coordinates: [-122.4194, 37.7749],
    conference: "SIGGRAPH",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=48&h=48&fit=crop&crop=face&auto=format",
  },
];

const WorldMap = () => {
  return (
    <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 0,
          latitude: 30,
          zoom: 1.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        {cities.map((city, index) => (
          <Marker
            key={index}
            longitude={city.coordinates[0]}
            latitude={city.coordinates[1]}
            anchor="bottom"
          >
            <div className="flex flex-col items-center">
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-white shadow-lg hover:scale-110 transition-transform duration-200">
                  <Image
                    src={city.imageUrl}
                    alt={`Researcher in ${city.name}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                </div>

                <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="font-semibold">{city.name}</div>
                  <div className="text-gray-300">{city.conference}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default WorldMap;
