"use client"
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export type ItemType = {
    count: number;
    food: FoodType;
}

export type FoodType = {
    price: number;
    ingredients: string[];
    name: string;
    image: string;
    id: string;
}

type ContextType = {
    item: ItemType[];
    totalAmount: number;
    addItem: (value: ItemType) => void;
    removeItem?: (id: string) => void;
    setOpen: (open: boolean) => void;
}

const CartContext = createContext<ContextType>({
    item: [],
    totalAmount: 0,
    addItem: (_item: any) => { },
    removeItem: (_id: string) => { },
    setOpen: (_open: boolean) => { },
})

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const getLocalStorage =
        typeof window !== "undefined" && localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart") as string)
            : []
    const [item, setItem] = useState<ItemType[]>(getLocalStorage);
    const [open, setOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const addItem = (value: ItemType) => {
        setOpen(true);

        const index = item.findIndex((i: ItemType) => i.food.id == value.food.id);
        console.log(index, "index");
        console.log(value, "value");

        if (index != -1) {
            const cloneArray = [...item];
            cloneArray[index].count += value.count;
            setItem(cloneArray);
            return;
        }

        setItem(prev => [...prev, value])
    };



    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(item));

        const eachFoodsTotal = item.map((i) => {
            return i.count * i.food.price
        });

        const total = eachFoodsTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        // let total = 0;
        // for (const n of eachFoodsTotal) total += n
        setTotalAmount(total);
    }, [item])

    return (
        <CartContext.Provider value={{ item, addItem, setOpen }}>
            <Sheet open={open} onOpenChange={setOpen}>
                {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent className="bg-neutral-700 min-w-1/3">
                    <div className="mx-8 mt-8 rounded-[20px] bg-white">
                        {item.map((i: any) => {
                            return (
                                <div key={i.food._id} className="p-4 grid grid-cols-3 gap-4">
                                    <img src={`${i.food.image}`} className="rounded-lg" />
                                    <div className="col-span-2">
                                    <div>
                                    <h5>{i.food.name}</h5>
                                    <p>{i.food.ingredients}</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <div className="flex gap-4 items-center">
                                                <Button disabled={i.count == 1} size="icon" variant="outline" className="rounded-full"><Minus></Minus></Button>
                                                <p className="w-3">{i.count}</p>
                                                <Button size="icon" variant="outline" className="rounded-full"><Plus></Plus></Button>
                                            </div>
                                            <p>{i.count * i.food.price}</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className=" bg-white rounded-[20px] mx-8 mt-8 p-4">
                        <h3>Payment Info</h3>
                        <div className="flex w-full justify-between">
                            <p>Items</p>
                            <p>{totalAmount}</p>
                        </div>
                        <div className="flex w-full justify-between">
                            <p>Shipping</p>
                            <p>$0.99</p>
                        </div>
                        <div className="flex w-full justify-between">
                            <p>Total</p>
                            <p>{`${totalAmount + 0.99}`}</p>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => {
    return useContext(CartContext)
}