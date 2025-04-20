"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { LoginType } from "../login/page";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export type ErrorType = {
    response: {
        data: {
            error: string;
        };
    };
    message: string;
};

const Register = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const formSchema = z.object({
        email: z.string().email(),
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
        try {
            const user = await axios.post(`${BASE_URL}/auth/register`, value);
            if (user) {
                toast("User successfully registered");
                router.push("/login")
            }
        } catch (error: unknown) {
            setError((error as ErrorType).response.data.error);
        }
    };

    return (
        <div className="grid grid-cols-5">
            <div className="col-span-2 w-1/2 place-self-center">
           <Link href="/"><Button size="icon" variant="outline"><ChevronLeft></ChevronLeft></Button></Link>
                <h3 className="font-semibold text-2xl mt-4">Create your account</h3>
                <p className="mb-6 text-muted-foreground">Sign up to explore your favorite dishes</p>
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
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit" className="w-full mb-6">Let's go</Button>
                    </form>
                </Form>
                <p className="text-muted-foreground text-center">Already have an account? <span className="text-blue-600"><Link href="/login">Login</Link></span></p>
            </div>
            <div className="col-span-3">
                <img src="/assets/loginImage.png" className="w-full p-5 rounded-lg" />
            </div>
        </div>
    )
}


export default Register