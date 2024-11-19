"use client"

import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function Page() {
    // validation
    const validation = z.object({
        email: z.string().email({
            message: "Must be a valid email",
        }),
        password: z.string().min(1, { message: 'Required' }),
    })

    // form
    const form = useForm({
        resolver: zodResolver(validation),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values) => {
        console.log(values)
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
                            style={{ width: 'auto', height: '64px' }}
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
                                <Button type="submit">Login</Button>
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
