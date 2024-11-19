"use client"

import Image from "next/image"
import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'

export default function AppSidebar({ children }) {
    const currentPath = usePathname()

    const navMain = [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
        },
        {
            title: "Employee",
            url: "/admin/employee",
        },
        {
            title: "User Management",
            url: "/admin/user-management",
        },
        {
            title: "Fellowship",
            url: "/admin/fellowship",
        },
        {
            title: "Observership",
            url: "/admin/observership",
        },
        {
            title: "Residency",
            url: "/admin/residency",
        },
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenuButton asChild className="h-auto hover:bg-transparent">
                    <Link href="/admin/dashboard" className="p-2">
                        <Image
                            src="/images/logo-inspire.png"
                            width={0}
                            height={0}
                            alt="INSPIRE"
                            sizes="100vw"
                            style={{ width: 'auto', height: '64px' }}
                        />
                    </Link>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={currentPath == item.url}>
                                    <Link href={item.url} className="font-medium">
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub>
                                        {item.items.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton asChild isActive={currentPath == item.url}>
                                                    <Link href={item.url}>{item.title}</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}