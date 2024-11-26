"use client";

import { usePathname } from "next/navigation";

import AppSidebar from "@/components/layout/fellowship/app-sidebar";
import AppUserNav from "@/components/layout/fellowship/app-usernav";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }) {
    const pathname = usePathname();

    return (
        <SidebarProvider className="max-h-screen overflow-auto">
            <AppSidebar />
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between p-2 border-b md:p-4">
                    <div className="flex items-center space-x-2 md:space-x-0">
                        <SidebarTrigger className="md:hidden" />
                        <Separator orientation="vertical" className="h-4 md:hidden" />
                        <p className="pl-1 text-sm font-medium md:pl-0 text-neutral-950">Hello, Fellowship</p>
                    </div>
                    <AppUserNav />
                </div>
                {children}
            </div>
        </SidebarProvider>
    );
}
