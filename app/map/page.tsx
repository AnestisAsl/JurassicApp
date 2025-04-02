// @ts-nocheck

"use client";

import React, { useState } from "react";
import FossilsMap from "@/customComponents/fossilsMap";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <FossilsMap />
      <ReactTooltip id="my-tooltip" float />
    </div>
  );
}
