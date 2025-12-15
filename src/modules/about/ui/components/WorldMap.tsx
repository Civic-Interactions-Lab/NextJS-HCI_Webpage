"use client";

import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl/mapbox-legacy";
import Image from "next/image";
import Link from "next/link";
import { ConferencesQueryResult } from "../../../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { getImageSrc } from "@/lib/utils";

interface WorldMapProps {
  conferences: ConferencesQueryResult;
}

const WorldMap = ({ conferences }: WorldMapProps) => {
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
        {conferences
          .filter(
            (conference) =>
              conference.coordinates?.lat && conference.coordinates?.lng,
          )
          .map((conference) => (
            <Marker
              key={conference._id}
              longitude={conference.coordinates!.lng!}
              latitude={conference.coordinates!.lat!}
              anchor="bottom"
            >
              <div className="flex flex-col items-center">
                <div className="relative group cursor-pointer">
                  {conference.link ? (
                    <Link
                      href={conference.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-white shadow-lg hover:scale-110 transition-transform duration-200">
                        {conference.image ? (
                          <Image
                            src={getImageSrc(conference.image)}
                            alt={`Conference in ${conference.location}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width={100}
                            height={100}
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            {conference.abbreviation ||
                              conference.name?.charAt(0) ||
                              "C"}
                          </div>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-white shadow-lg hover:scale-110 transition-transform duration-200">
                      {conference.image ? (
                        <Image
                          src={getImageSrc(conference.image)}
                          alt={`Conference in ${conference.location}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          {conference.abbreviation ||
                            conference.name?.charAt(0) ||
                            "C"}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="font-semibold">{conference.location}</div>
                    <div className="text-gray-300">{conference.name}</div>
                    {conference.dates && (
                      <div className="text-gray-400">{conference.dates}</div>
                    )}
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
