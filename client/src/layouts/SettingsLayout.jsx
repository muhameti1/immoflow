// import { SidebarNav } from "@/components/SettingsSidebarNav";
import { NavMain } from "@/components/nav-main";
import { NavMainSettings } from "@/components/SettingsSidebarNav";
import { Separator } from "@/components/ui/separator";
import {
  AlarmClockPlusIcon,
  Bell,
  Bolt,
  Palette,
  SquareMousePointer,
  User,
  Wrench,
} from "lucide-react";

const sidebarNavItems = [
  {
    title: "Profile",
    url: "/app/settings",
    icon: User,
  },
  {
    title: "Company",
    url: "/app/settings/company",
    icon: Bolt,
  },
  {
    title: "Appearance",
    url: "/app/settings/appearance",
    icon: Palette,
  },
  {
    title: "Notifications",
    url: "/app/settings/notifications",
    icon: Bell,
  },
  {
    title: "Display",
    url: "/app/settings/display",
    icon: SquareMousePointer,
  },
];

export default function SettingsLayout({ children }) {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <img
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <NavMainSettings items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
