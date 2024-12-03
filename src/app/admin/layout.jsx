import AppSidebar from "@/components/layout/admin/app-sidebar"
import AppUserNav from "@/components/layout/admin/app-usernav"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/auth"

export default async function Layout({ children }) {
    const session = await auth()

    return (
        <SidebarProvider className="w-full max-h-screen">
            <AppSidebar />
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between p-2 pr-4 border-b md:p-4">
                    <div className="flex items-center w-full space-x-2 md:space-x-0">
                        <SidebarTrigger className="md:hidden" />
                        <Separator orientation="vertical" className="h-4 md:hidden" />
                        <p className="pl-1 text-sm font-medium md:pl-0 text-neutral-950">Hello, Admin</p>
                    </div>
                    <AppUserNav />
                </div>
                {children}
            </div>
        </SidebarProvider>
    )
}