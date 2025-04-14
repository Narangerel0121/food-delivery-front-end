import { BASE_URL } from "@/constants"
import { CategoryType } from "./FoodList";
import { Badge, badgeVariants } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CategoryList = async () => {
    const response = await fetch(`${BASE_URL}/categories`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    // console.log(data)
    return (
       <>
       <h1 className="font-semibold text-3xl text-white mb-9">Categories</h1>
        <div className="flex gap-3 overflow-auto">
            {data.category.map((category: CategoryType) => {
                return (
                    <Link href={`/category/${category.name}`} key={category._id} className={cn(badgeVariants({ variant: "outline" }), "border rounded-full py-1 px-5 font-normal text-lg bg-[#FAFAFA] text-black"  )}>{category.name}</Link>
                )
            })}
        </div>
       </>
    )
}

export { CategoryList }