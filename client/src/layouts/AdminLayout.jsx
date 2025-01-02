import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { useMemo } from "react";

function generateBreadcrumbs(pathname) {
  // Remove trailing slash and split path into segments
  const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);

  return segments.map((segment, index) => {
    // Build the path for this breadcrumb
    const path = "/" + segments.slice(0, index + 1).join("/");

    // Format the segment text (capitalize, replace hyphens with spaces)
    const text = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return { text, path };
  });
}

export default function AdminLayout({ children }) {
  const location = useLocation();
  const breadcrumbs = useMemo(
    () => generateBreadcrumbs(location.pathname),
    [location.pathname]
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.path}>
                    <BreadcrumbItem
                      className={index === 0 ? "hidden md:block" : ""}
                    >
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{breadcrumb.text}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink as={Link} to={breadcrumb.path}>
                          {breadcrumb.text}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator
                        className={index === 0 ? "hidden md:block" : ""}
                      />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
