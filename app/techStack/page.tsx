"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Page() {
  const [isOpenQ1, setIsOpenQ1] = React.useState(false);
  const [isOpenQ2, setIsOpenQ2] = React.useState(false);
  const [isOpenQ3, setIsOpenQ3] = React.useState(false);

  return (
    <div className="flex  flex-col items-center justify-center h-full">
      <Collapsible
        open={isOpenQ1}
        onOpenChange={setIsOpenQ1}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            What is the goal of this project ?
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            This projet was made for web development practice on modern web
            development technologies
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={isOpenQ2}
        onOpenChange={setIsOpenQ2}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Tech stack</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            Next.js,PostgreSQL,GraphQL,Apollo,Prisma,
            <br />
            Shadcn,Tailwind CSS,React Flow,Lucide,React Simple Maps
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={isOpenQ3}
        onOpenChange={setIsOpenQ3}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Link</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            <a href="https://github.com/AnestisAsl">Github</a>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
