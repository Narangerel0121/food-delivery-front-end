import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/constants";
import axios from "axios"
import { Pen, Trash } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookImage } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PropsType = {
    category: string,
    image: string,
    price: string,
    ingredients: string,
    name: string,
    foodId: string,
    categoryId: string
}


export function UpdateFoodDialog(props: PropsType) {

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
            foodName: `${props.name}`,
            price: `${props.price}`,
            ingredients: `${props.ingredients}`,
            category: `${props.categoryId}`,
            image: `${props.image}`,
        },
    });

    // const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const UPLOAD_PRESET = "ml_default";
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    type ValueType = {
        foodName: string,
        price: string,
        ingredients: string,
        category: string,
        image: string,
    }

    const onSubmit = async (value: ValueType) => {

        const formData = new FormData();
        formData.append("file", file as File);
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

        const food = await axios.put(`${BASE_URL}/foods/${props.foodId}`, { ...value, image: url }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(food);
    };

    const deleteFood = async () => {
        const token = localStorage.getItem("token");
        const deleteFood = await axios.delete(`${BASE_URL}/foods/${props.foodId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full absolute bottom-2 right-2"><Pen></Pen></Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Dishes info</DialogTitle>
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
                            <Label htmlFor="update_image">
                                <p>Food image</p>
                                {imageLink ? <img src={imageLink} className="w-100 h-40" />
                                    : <div className="w-full h-40 border border-dashed border-blue-400 bg-blue-50/50 rounded-lg flex flex-col justify-center items-center">
                                        <div className="rounded-full w-10 h-10 bg-white flex items-center justify-center"><BookImage /></div>
                                        <p>Choose a file or drap & drop it here</p>
                                    </div>}
                            </Label>
                            <Input type="file" id="update_image" className="hidden" onChange={handleImage} />
                        </div>

                        <div className="justify-self-end">
                            <Button type="submit" className="justify-start-end">Save changes</Button>
                        </div>
                    </form>
                </Form>
                <Button size="icon" variant="outline" className="border border-red-500 absolute bottom-6 left-6" onClick={deleteFood}><Trash color="#f50505" /></Button>
            </DialogContent>
        </Dialog>
    )
}
