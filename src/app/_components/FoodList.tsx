import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/constants";
import { DialogDemo } from "./DialogDemo";


export type CategoryType = {
    name: string;
    foods: FoodType[];
    _id: string;
    createdAt: string;
    updatedAt: string;
};

type FoodType = {
    foodName: string;
    price: number;
    category: string;
    image: string;
    ingredients: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

const FoodList = async () => {
    const response = await fetch(`${BASE_URL}/categories/with-foods`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    // console.log(data)
    return (
        <>
            <div>{data.categories.slice(2, 3).map((category: CategoryType) => {
                return (
                    <div key={category._id}>
                        <h1 className="font-semibold text-3xl text-white mb-9 mt-16">{category.name}</h1>
                        <div className="grid grid-cols-4">{category.foods.map((food) => {
                            return (
                                <Card key={food._id} className="w-[360px] rounded-[20px] my-9 p-4">
                                    <div className="relative w-full p-0">
                                        <img src={`${food.image}`} className="object-cover rounded-xl" />
                                        <DialogDemo id={food._id} name={food.foodName} price={food.price} ingredients={food.ingredients} image={food.image} />
                                    </div>
                                    <div className="flex justify-between">
                                        <h5>{food.foodName}</h5>
                                        <p>{`$${food.price}`}</p>
                                    </div>
                                    <div className="mb-5">
                                        {food.ingredients}
                                    </div>
                                </Card>
                            )
                        })}</div>
                    </div>
                )
            })}</div>
        </>
    )
}

export { FoodList }