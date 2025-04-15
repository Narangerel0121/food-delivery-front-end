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
import { ValueType } from "../login/page";
import { useAuth } from "@/providers/AuthProvider";

const Register = () => {
    const [error, setError] = useState("");
    const router = useRouter();

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

    const {register, error} = useAuth();

    const onSubmit = async (value: ValueType) => {
        try {
            const user = await axios.post(`${BASE_URL}/auth/register`, value);
            if (user) {
                toast("User successfully registered");
                router.push("/login")
            }
        } catch (error: any) {
            setError(error.Formmessage)
        }
        console.log(value)
    }

    return (
        <div>
            <h1>Register</h1>
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


export default Register