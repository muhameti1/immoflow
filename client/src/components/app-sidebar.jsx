import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Command,
  DollarSign,
  Frame,
  GalleryVerticalEnd,
  IdCard,
  ListTodo,
  Mail,
  Map,
  Megaphone,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Properties",
      url: "/app/properties",
      icon: PieChart,
    },
    {
      title: "Contacts",
      url: "/app/contacts",
      icon: IdCard,
    },
    {
      title: "Deals",
      url: "/app/deals",
      icon: DollarSign,
    },
    {
      title: "Mailbox",
      url: "/app/mailbox",
      icon: Mail,
    },
    {
      title: "Calendar",
      url: "/app/calendar",
      icon: Calendar,
    },
    {
      title: "Tasks",
      url: "/app/tasks",
      icon: ListTodo,
    },
    {
      title: "Mailings",
      url: "/app/mailings",
      icon: Megaphone,
    },
    {
      title: "Settings",
      url: "/app/settings",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
