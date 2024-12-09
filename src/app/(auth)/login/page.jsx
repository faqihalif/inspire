"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Page() {
    const { toast } = useToast()
    const [submitLoading, setSubmitLoading] = useState(false)

    // validation
    const validation = z.object({
        email: z.string().email({
            message: "Must be a valid email",
        }),
        password: z.string().min(1, { message: "Required" }),
    })

    // form
    const form = useForm({
        resolver: zodResolver(validation),
        defaultValues: {
            email: "",
            password: "",
            redirect: false
        }
    })

    const onSubmit = async (values) => {
        setSubmitLoading(true)
        let response = await signIn(
            "credentials",
            {
                email: values.email,
                password: values.password,
                redirect: false,
            }
        )

        if (!response.error) {
            setSubmitLoading(false)
            redirect("/admin/dashboard")
        } else {
            if (response.code == "UserNotFound") {
                toast({
                    title: "Error",
                    description: "User not found",
                    variant: "destructive",
                    duration: 3000
                })
                setSubmitLoading(false)
            } else if (response.code == "InvalidCredentials") {
                toast({
                    title: "Error",
                    description: "Username or password is wrong",
                    variant: "destructive",
                    duration: 3000
                })
                setSubmitLoading(false)
            } else if (response.code == "UserInactive") {
                toast({
                    title: "Error",
                    description: "User is inactive, please contact system administrator",
                    variant: "destructive",
                    duration: 3000
                })
                setSubmitLoading(false)
            } else {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                    duration: 3000
                })
                setSubmitLoading(false)
            }
        }
    }

    return (
        <div className="sm:h-screen">
            <div className="flex flex-col h-full max-w-sm p-4 mx-auto md:justify-center">
                <div>
                    <Link href="/admin/dashboard">
                        <Image
                            src="/images/logo-inspire.png"
                            width={0}
                            height={0}
                            alt="INSPIRE"
                            sizes="100vw"
                            style={{ width: "auto", height: "64px" }}
                            priority
                        />
                    </Link>
                </div>
                <div className="pt-8 space-y-4">
                    <div className="space-y-2">
                        <div>
                            <p className="text-xl font-semibold text-neutral-950">Hey there! 👋</p>
                            <p className="text-xl font-semibold text-neutral-950">Please log in to access your account</p>
                        </div>
                        <p className="text-sm text-neutral-500">Enter your email below to login to your account</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                {
                                    submitLoading ? (
                                        <Button disabled>
                                            <Loader2 className="animate-spin" />
                                            Loading
                                        </Button>
                                    ) : (
                                        <Button type="submit">Login</Button>
                                    )
                                }
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="flex justify-center pt-8">
                    <Link href="#" className="text-sm text-neutral-500">Forgot password? <span className="font-semibold text-blue-700">Click here</span></Link>
                </div>
            </div>
        </div>

    )
}
