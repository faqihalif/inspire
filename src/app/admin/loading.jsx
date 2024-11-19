"use client"

import { Skeleton } from "@/components/ui/skeleton"
import useWindowSize from "@/hooks/use-window-size"

export default function Loading() {
    // window size
    const windowSize = useWindowSize()

    return (
        <div className="w-full p-4 space-y-8 overflow-y-auto" style={{ maxWidth: windowSize.width > 768 ? (windowSize.width - 256) : '100%' }}>
            <Skeleton className="w-40 h-6" />
            <Skeleton className="h-96" style={{ width: windowSize.width > 768 ? (windowSize.width - (256 + 32)) : (windowSize.width - 32) }} />
        </div>
    )
}
