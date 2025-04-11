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
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode"

const Login = () => {
    const [error, setError] = useState("");
    const router = useRouter();

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
    })

    const onSubmit = async (value) => {
        try {
            const user = await axios.post(`${BASE_URL}/auth/login`, value);
            console.log(user, "user info")
            if (user) {
                // router.push("/")
            }

            const decodedToken = jwtDecode(user.data.token);
            // console.log(decodedToken);
            // localStorage.setItem("token", decodedToken) // yanzlah

            if (decodedToken.user.role == "ADMIN") {
                router.push('/admin');
                return;
            } else {
                router.push('/')
            }

        } catch (error) {
            setError(error.response.data.error)
        }
        console.log(value)
    }

    return (
        <div>
            <h1>Log in</h1>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="email" type="email" {...field} />
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
                                        <Input placeholder="password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && <p>{error}</p>}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

            </div>
        </div>
    )
}


export default Login