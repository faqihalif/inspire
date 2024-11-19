"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import useWindowSize from "@/hooks/use-window-size"

export default function Page() {
    // window size
    const windowSize = useWindowSize()

    return (
        <div className="p-4 space-y-8 overflow-auto" style={{ maxWidth: windowSize.width > 768 ? (windowSize.width - 256) : '100%' }}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>User Management</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
                <p className="font-medium text-neutral-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam aperiam beatae rerum similique odio alias amet voluptatibus aliquam doloribus, tempora sint cumque ullam soluta labore provident repellat rem non?</p>
            </div>
        </div>
    )
}
