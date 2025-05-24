import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { BookImage, Plus } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
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

type PropsType = {
    id: string;
    categoryName: string
}

export function AddFoodDialog(props: PropsType) {
    // console.log(props.id)
    const [file, setFile] = useState<any>("");
    const [imageLink, setImageLink] = useState("");

    const handleImage = (event: any) => {
        setImageLink(window.URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
    }

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
    const UPLOAD_PRESET = "ml_default";
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const onSubmit = async (value: ValueType) => {

        const formData = new FormData();
        formData.append("file", file);
        console.log(file, "here is file")
        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const { url } = await response.json();
        console.log(url, "this is image url")
        const token = localStorage.getItem("token");
        const food = await axios.post(`${BASE_URL}/foods`, { ...value, image: url, category: props.id }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(food);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="border-dashed border-red-500 dashed-10 items-center justify-center">
                    <Button className="rounded-full bg-red-500 w-12 h-12"><Plus></Plus></Button>
                    <h3 className="text-red-500 text-2xl">Add new dish to {`${props.categoryName}`}</h3>
                </Card>

            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Add new dish to {`${props.categoryName}`}</DialogTitle>
                </DialogHeader>

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
                            <Label htmlFor="add_image">
                                <p>Food image</p>
                                {imageLink ? <img src={imageLink} className="w-100 h-40" />
                                    : <div className="w-full h-auto border border-dashed border-blue-400 bg-blue-50/50 rounded-lg flex flex-col justify-center items-center">
                                        <div className="rounded-full w-10 h-10 bg-white flex items-center justify-center"><BookImage /></div>
                                        <p>Choose a file or drap & drop it here</p>
                                    </div>}
                            </Label>
                            <Input type="file" id="add_image" className="hidden" onChange={handleImage} />
                        </div>

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
