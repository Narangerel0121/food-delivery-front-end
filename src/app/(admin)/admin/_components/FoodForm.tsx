"use client";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { BookImage } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


type ValueType = {
    foodName: string,
    price: string,
    ingredients: string,
    category: string,
    image: string,
}

const FoodForm = () => {

    const [file, setFile] = useState<any>("");

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

    // const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    //  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = "ml_default";
    const CLOUD_NAME = "dom6noopv"

    const onSubmit = async (value: ValueType) => {

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
        const token = localStorage.getItem("token");
        const food = await axios.post(`${BASE_URL}/foods`, { ...value, image: url }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(result)



        console.log(food);
    };

    return (
        <div className="w-1/3">
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
                        <Label htmlFor="food_image">
                            <p>Food image</p>
                            {file ? <img src={file} className="w-full h-auto" />
                                : <div className="w-full h-auto border border-dashed border-blue-400 bg-blue-50/50 rounded-lg flex flex-col justify-center items-center">
                                    <div className="rounded-full w-10 h-10 bg-white flex items-center justify-center"><BookImage /></div>
                                    <p>Choose a file or drap & drop it here</p>
                                </div>}
                        </Label>
                        <Input type="file" id="food_image" className="hidden" onChange={(event: any) => setFile(window.URL.createObjectURL(event.target.files[0]))} />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default FoodForm;