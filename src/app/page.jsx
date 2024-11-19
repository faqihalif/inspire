import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
    return (
        <div className="w-full h-screen">
            <div className="container flex items-center justify-center h-full">
                <Link href="/admin/dashboard">
                    <Button>
                        Go to Admin Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    )
}
