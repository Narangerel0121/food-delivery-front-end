"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

const Admin = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const formSchema = z.object({
        foodName: z.string(),
        price: z.string(),
        ingredients: z.string(),
        image: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            foodName: "",
            price: "",
            ingredients: "",
            image: ""
        },
    })

    const onSubmit = async (value) => {
        try {
            const user = await axios.post(`${BASE_URL}/foods`, value);
            if (user) {
                toast("Food successfully added");
                // router.push("/")
            }
        } catch (error) {
            setError(error.Formmessage)
        }
        console.log(value)
    }

    return (
        <div>
            <h1>Admin: Add food...</h1>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="foodName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="foodName" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ingredients"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="ingredients" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input id="picture" type="file" />
                        </div> */}
                        {error && <p>{error}</p>}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

            </div>
        </div>
    )
}


export default Admin