// @ts-nocheck

"use client";
import React, { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { gql, useQuery } from "@apollo/client";
import { ErrorPage } from "@/customComponents/errorPage";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scaleQuantize } from "d3-scale";

const getData = gql`
  query {
    fossils {
      id
      dinosaurId
      location
      date
      paleontologists
      latitude
      longitude
    }
    dinosaurs {
      id
      name
      height
      weight
      mesozoicEra
      facts
    }
  }
`;
const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618",
  ]);
//
const FossilsMap = () => {
  const { data, error, loading } = useQuery(getData);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const mapWidth = 800;
  const mapHeight = 400;
  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }
  if (error) return <ErrorPage />;
  let markers = [];
  if (data) {
    console.log(data);
    for (const fossil of data.fossils) {
      const foundDinosaur = data.dinosaurs.find(
        (dino) => dino.id === fossil.dinosaurId
      );
      let tempMarker = {
        markerOffset: 15,
        name: fossil.id,
        coordinates: [fossil.longitude, fossil.latitude],
        fossilData: fossil,
        dinosaurData: foundDinosaur,
      };
      markers.push(tempMarker);
    }
  }
  return (
    <div className="flex justify-center">
      {loading ? (
        <Button disabled>
          <Loader2 className="animate-spin" />
          Please wait
        </Button>
      ) : (
        <ComposableMap
          data-tip=""
          width={mapWidth}
          height={mapHeight}
          projectionConfig={{ scale: 100 }}
        >
          <ZoomableGroup
            center={[0, 0]}
            zoom={1}
            minZoom={1}
            maxZoom={3}
            translateExtent={[
              [0, 0],
              [mapWidth, mapHeight],
            ]}
          >
            <Geographies geography="/geoJSONdata.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      pressed: { outline: "none" },
                      default: {
                        fill: "hsl(36 45% 70%)",
                        outline: "none",
                      },
                      hover: {
                        fill: "hsl(36 45% 15%)",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {markers.map(
              ({
                name,
                coordinates,
                markerOffset,
                fossilData,
                dinosaurData,
              }) => (
                <Marker
                  key={name}
                  coordinates={coordinates}
                  data-tooltip-id="my-tooltip"
                  data-html={true}
                  data-tooltip-html={`
                      <div class="templateClass">
                      
                        <h3><b>${dinosaurData.name}</b></h3>
                        <br />
                        <ul>
                          <li>Paleontologist(s) : ${fossilData.paleontologists}</li>
                          <li>Date : ${fossilData.date}</li>
                        </ul>
          
                      </div>
                    `}
                >
                  <g
                    fill="none"
                    stroke="#FF5533"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-12, -24)"
                  >
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                  </g>
                </Marker>
              )
            )}
          </ZoomableGroup>
        </ComposableMap>
      )}
    </div>
  );
};
export default memo(FossilsMap);
