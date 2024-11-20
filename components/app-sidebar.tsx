"use client";

import * as React from "react";
import { Shell, BookOpen, SearchCode, Leaf } from "lucide-react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Prehistoric fauna",
      url: "#",
      icon: Shell,
      isActive: true,
      items: [
        {
          title: "Charts",
          url: "#",
        },
        {
          title: "Flows",
          url: "#",
        },
        {
          title: "Fossils Map",
          url: "#",
        },
      ],
    },
    {
      title: "Prehistoric flora",
      url: "#",
      icon: Leaf,
      items: [
        {
          title: "Charts",
          url: "#",
        },
      ],
    },
    {
      title: "Others",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Climate",
          url: "#",
        },
        {
          title: "Extinction",
          url: "#",
        },
      ],
    },
    {
      title: "Tech stack",
      url: "#",
      icon: SearchCode,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
