"use client"
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";


const CartContext = createContext({
    item: [],
    totalAmount: 0,
    addItem: (_item: any) => { },
    removerItme: (_id: string) => { }
})

type ItemType = {
    count: number;
    food: {
        price: number;
        ingredients: string[];
        name: string;
        _id: string;
    }
}


const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [item, setItem] = useState<ItemType[]>([]);
    const [open, setOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const addItem = (value: ItemType) => {
        setOpen(true);
    
        const index = item.findIndex(i => i.food._id == value.food._id);
        console.log(index, "index");
        console.log(value, "value")

        if (index != -1) {
            const cloneArray = [...item];
            cloneArray[index].count += value.count;
            setItem(cloneArray);
            return;
        }
    };

    // setItem(prev => [...prev, value])

    useEffect(() => {
        const eachFoodsTotal = item.map((i) => {
            return i.count * Number(i.food?.price)
        });

        const total = eachFoodsTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        // let total = 0;
        // for (const n of eachFoodsTotal) total += n
        setTotalAmount(total);
    }, [item])

    return (
        <CartContext.Provider value={{ item, addItem }}>
            <Sheet open={open} onOpenChange={setOpen}>
                {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent>
                    <div>
                        {item.map((i: any) => {
                            return (
                                <div className="p-4">
                                    <img src={`${i.food.image}`} />
                                    <h5>{i.food.name}</h5>
                                    <p>{i.food.ingredients}</p>
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
                            )
                        })}
                    </div>
                    <div className="flex w-full justify-between">
                        <p>Total amount</p>
                        <p>{totalAmount}</p>
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