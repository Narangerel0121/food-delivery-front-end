"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { UpdateFoodDialog } from "./UpdateFoodDialog";
import { Plus } from "lucide-react";
import { CategoryDialog } from "./CategoryDialog";
import { AddFoodDialog } from "./AddFoodDialog";

type FoodType = {
    foodName: string;
    price: number;
    image: string;
    ingredients: string[];
    _id: string;
}

type CategoryType = {
    name: string;
    _id: string;
    foods: FoodType[]
}

const FoodMenu = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategoriesWithFoods = async () => {
            const response = await axios.get(`${BASE_URL}/categories/with-foods`)
            setCategories(response.data.categories);
            // console.log(categories)
        }
        getCategoriesWithFoods();
    }, []);

    return (
        <div className="w-fit">
            <div>
                <h1>Dishes category</h1>
                <div className="space-x-2 space-y-2">
                    {categories.map((category: CategoryType) => {
                        return (
                            <Button variant="outline" className="rounded-full">{category.name}<span>{category.foods.length}</span></Button>
                        )
                    })}
                    <CategoryDialog />
                </div>
            </div>

            <div>
                {categories.slice(2, 3).map((category: CategoryType) => {
                    return (
                        <div>
                            <h1 className="font-semibold text-2xl my-3 ">{category.name}<span>{`(${category.foods.length})`}</span></h1>
                            <div className="space-y-2 grid grid-cols-3 gap-10">
                               <AddFoodDialog categoryName={category.name} id={category._id} />
                                {category.foods.map((food) => {
                                    return (
                                        <Card>
                                            <div className="relative">
                                                <img src={`${food.image}`} />
                                                <UpdateFoodDialog category={category.name} image={food.image} price={food.price} ingredients={food.ingredients} name={food.foodName} foodId={food._id} categoryId={category._id}></UpdateFoodDialog>
                                            </div>
                                            <div className="m-4">
                                                <div className="flex justify-between">
                                                    <h3>{food.foodName}</h3>
                                                    <p>{food.price}</p>
                                                </div>
                                                <p>{food.ingredients}</p>
                                            </div>
                                        </Card>
                                    )
                                })}</div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
};

export default FoodMenu;