"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"

export default function ErrorComponent(props) {
    const { message, action } = props

    return (
        <Card>
            <CardContent className="pt-6 space-y-8">
                <Image
                    src="/images/error.png"
                    width={0}
                    height={0}
                    alt="INSPIRE"
                    sizes="100vw"
                    style={{ width: '400px', height: 'auto' }}
                    className="mx-auto"
                />
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* message */}
                    {
                        message ? (
                            <p className="font-medium text-center text-neutral-950">{message}</p>
                        ) : (
                            <p className="font-medium text-center text-neutral-950">Connection timed out, please try again.</p>
                        )
                    }
                    {/* end message */}

                    {/* action */}
                    {
                        action && <Button variant="outline" onClick={() => action()}>
                            <RotateCw className="w-4 h-4" />
                            Refresh
                        </Button>
                    }
                    {/* end action */}
                </div>
            </CardContent>
        </Card>
    )
}
