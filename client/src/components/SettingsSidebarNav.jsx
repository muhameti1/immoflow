import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

export function NavMainSettings({ items }) {
  const location = useLocation();

  const isActive = (url) => {
    return location.pathname === url;
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              className={
                item.url && isActive(item.url)
                  ? "bg-sidebar-accent text-black dark:text-white"
                  : ""
              }
            >
              {item.icon && <item.icon />}
              <a href={item.url}>
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
            {item.items?.map((subItem) => (
              <SidebarMenuItem key={subItem.title}>
                <SidebarMenuButton
                  tooltip={subItem.title}
                  className={isActive(subItem.url) ? "bg-sidebar-border" : ""}
                >
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}