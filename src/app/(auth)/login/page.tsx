"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";


export type LoginType = {
    email: String,
    password: String
}

export type DecodedTokenType = {
    user: {
        email: String,
        password: String,
        role: String,
        id: String
    }
    token: string,
}

const Login = () => {

    const { login, error } = useAuth();

    const formSchema = z.object({
        email: z.string().email().min(2).max(50),
        password: z.string().min(8),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = async (value: LoginType) => {
        login(value);

    }

    return (
        <div className="grid grid-cols-5">
            <div className="col-span-2 place-self-center w-1/2">
               <Link href="/"><Button size="icon" variant="outline" className="mb-6"><ChevronLeft></ChevronLeft></Button></Link>
                <h3 className="text-2xl font-semibold">Login</h3>
                <p className="text-muted-foreground mb-6">Log in to explore your favorite dishes</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Enter your email address" type="email" {...field} />
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
                                    <FormControl>
                                        <Input placeholder="Password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       <p className="mb-6"><Link href="reset-password">Forget password?</Link></p> 
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit" className="w-full">Let's go</Button>
                    </form>
                </Form>
                <p className="text-muted-foreground mt-6 text-center">Don't have an account yet?<span className="text-blue-600"><Link href="/register"> Sign up</Link></span></p>
            </div>
            <div className="col-span-3">
                <img src="/assets/loginImage.png" className="w-full h-fit p-5 rounded-lg" />
            </div>
        </div>
    )
}


export default Login