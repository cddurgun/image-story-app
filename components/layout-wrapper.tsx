"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/nav";
import ProtectedRoute from "@/components/protected-route";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Public routes that don't need the sidebar layout
  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <ProtectedRoute>
      {isPublicRoute ? (
        // Public layout - no sidebar
        <>{children}</>
      ) : (
        // Protected layout - with sidebar
        <div className="flex">
          <Nav />
          <main className="flex-1 md:ml-64 p-4 md:p-8 pt-16 md:pt-8">{children}</main>
        </div>
      )}
    </ProtectedRoute>
  );
}
