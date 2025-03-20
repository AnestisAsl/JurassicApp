"use client";
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export default function FossilsMap() {
  return (
    <ComposableMap>
      <Geographies geography="/geoJSONdata.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: {
                  fill: "blue",
                },
                hover: {
                  fill: "#F53",
                },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}
