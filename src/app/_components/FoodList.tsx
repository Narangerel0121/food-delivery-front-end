import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/constants";


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
                                <Card key={food._id} className="p-2 w-[360px] rounded-[20px] my-9">
                                    <CardHeader>
                                        <img src={`${food.image}`} className="object-cover rounded-xl mt-5" />
                                    </CardHeader>
                                    <CardContent className="flex justify-between">
                                        <CardTitle>{food.foodName}</CardTitle>
                                        <p>{`$${food.price}`}</p>
                                    </CardContent>
                                    <CardFooter className="mb-5">
                                        {food.ingredients}
                                    </CardFooter>
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