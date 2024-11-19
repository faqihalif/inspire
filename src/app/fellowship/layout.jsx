"use client";

import { usePathname } from "next/navigation";

import AppSidebar from "@/components/layout/fellowship/app-sidebar";
import AppUserNav from "@/components/layout/fellowship/app-usernav";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function FellowshipLayout({ children }) {
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname === "/fellowship/my-profile") return "My Profile";
        if (pathname === "/fellowship/timeline") return "Timeline";
        if (pathname === "/fellowship/attendance") return "Attendance";
        if (pathname === "/fellowship/paper") return "Paper";
        if (pathname === "/fellowship/file") return "File";
        if (pathname === "/fellowship/logbook") return "Logbook";
        if (pathname === "/fellowship/database-penelitian-fellowship")
            return "Database Penelitian Fellowship";
        if (pathname === "/fellowship/library") return "Library";
        if (pathname === "/fellowship/form-permintaan-data")
            return "Form Permintaan Data";
        return "Fellowship"; // Default title
    };

    return (
        <SidebarProvider className="max-h-screen overflow-auto">
            <AppSidebar />
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between p-2 border-b md:p-4">
                    <div className="flex items-center space-x-2 md:space-x-0">
                        <SidebarTrigger className="md:hidden" />
                        <Separator orientation="vertical" className="h-4 md:hidden" />
                        <p className="pl-1 text-sm font-medium text-neutral-950">
                            {getPageTitle()}
                        </p>
                    </div>
                    <AppUserNav />
                </div>
                {children}
            </div>
        </SidebarProvider>
    );
}
