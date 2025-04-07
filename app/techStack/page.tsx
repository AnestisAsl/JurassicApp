import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="h-full flex items-center flex-col justify-center">
      <Card>
        <CardContent>
          {" "}
          <h1 className="font-bold text-2xl">What is this project ?</h1>
          <p className="text-xl">
            The goal of this project is my personal web development practice
            with modern technologies,libraries and frameworks.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {" "}
          <h1 className="font-bold text-2xl">Tech stack</h1>
          <ul className="list-disc">
            <li>Next.JS</li>
            <li>TypeScript</li>
            <li>PostgreSQL</li>
            <li>GraphQL</li>
            <li>Apollo</li>
            <li>Shadcn</li>
            <li>React Flow</li>
            <li>React Simple Maps</li>
            <li>React Tooltip</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
