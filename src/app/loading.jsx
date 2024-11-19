"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex w-full h-screen">
            <div className="w-[256px] p-4 bg-neutral-50 md:flex-col space-y-10 border-r hidden md:flex">
                <Skeleton className="h-16 w-44" />
                <Skeleton className="w-44 h-96" />
            </div>

            <div className="flex flex-col flex-1 w-full bg-white">
                <div className="flex items-center justify-between px-4 py-2 border-b md:p-4">
                    <div>
                        <Skeleton className="w-32 h-8" />
                    </div>
                    <div>
                        <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                </div>
                <div className="w-full p-4 space-y-8">
                    <Skeleton className="w-40 h-6" />
                    <Skeleton className="w-full h-96" />
                </div>
            </div>
        </div>
    )
}
