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
      url: "",
      icon: Shell,
      isActive: true,
      items: [
        {
          title: "Charts",
          url: "charts",
        },
        {
          title: "Flows",
          url: "flows",
        },
        {
          title: "Fossils Map",
          url: "map",
        },
        {
          title: "Home",
          url: "/",
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
      items: [
        {
          title: "What is this project",
          url: "techStack",
        },
      ],
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
