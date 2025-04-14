"use client";

import { Button } from "@/components/ui/button";
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { headers } from "next/headers";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Admin = () => {
    const [file, setFile] = useState("");

    const formSchema = z.object({
        foodName: z.string().min(2).max(50),
        price: z.string(),
        ingredients: z.string(),
        category: z.string(),
        image: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            foodName: "",
            price: "",
            ingredients: "",
            category: "",
            image: "",
        },
    });

    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const onSubmit = async (val) => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const { url } = await response.json();
        // console.log(result)

        const token = localStorage.getItem("token");
        const food = await axios.post(`${BASE_URL}/foods`, { ...val, image: url }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(food);
    };

    return (
        <div className="w-1/2 mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <FormField
                            control={form.control}
                            name="foodName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Enter food name..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="my-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter food price..."
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="my-4">
                        <FormField
                            control={form.control}
                            name="ingredients"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter food ingredients..."
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="my-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Enter category..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="my-4">
                        <Input type="file" onChange={(event) => setFile(event.target.files[0])} />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default Admin;