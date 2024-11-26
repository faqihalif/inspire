"use client";

import Image from "next/image";
import Link from "next/link";
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
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function AppSidebar({ children }) {
  const currentPath = usePathname();

  const navMain = [
    {
      title: "My Profile",
      url: "/fellowship/my-profile",
    },
    {
      title: "Timeline",
      url: "/fellowship/timeline",
    },
    {
      title: "Attendance",
      url: "/fellowship/attendance",
    },
    {
      title: "Paper",
      url: "/fellowship/paper",
    },
    {
      title: "File",
      url: "/fellowship/file",
    },
    {
      title: "Logbook",
      url: "/fellowship/logbook",
    },
    {
      title: "Database Penelitian Fellowship",
      url: "/fellowship/database-penelitian-fellowship",
    },
    {
      title: "Library",
      url: "/fellowship/library",
    },
    {
      title: "Form Permintaan Data",
      url: "https://forms.clickup.com/25617311/f/rdrwz-10002/ZW99HUXKWI6Z0V1FB6",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton asChild className="h-auto hover:bg-transparent">
          <Link href="/fellowship/my-profile" className="p-2">
            <Image
              src="/images/logo-inspire.png"
              width={0}
              height={0}
              alt="INSPIRE"
              sizes="100vw"
              style={{ width: "auto", height: "64px" }}
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
                        <SidebarMenuSubButton
                          asChild
                          isActive={currentPath == item.url}
                        >
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
  );
}
