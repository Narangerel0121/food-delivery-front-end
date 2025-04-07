import { BASE_URL } from "@/app/constants"

type CategoryType = {
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
    _id: string;
    createdAt: string;
    updatedAt: string;
}

const Food = async () => {
    const response = await fetch(`${BASE_URL}/categories/with-foods`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data)
    return (
        <div className="m-10">
            {data.categories.map((d: CategoryType) => (
                <div key={d._id}>
                    <div className="font-bold mt-4">{d.name}</div>
                    <div>{d.foods.map((food) => (
                        <p key={food._id}>{food.foodName}</p>
                    ))}</div>
                </div>
            ))}
        </div>
    )
}

export { Food }