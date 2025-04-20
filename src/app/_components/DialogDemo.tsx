"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FoodType, useCart } from "@/providers/CartProvider"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

export function DialogDemo(props: FoodType) {
  const [counter, setCounter] = useState(1);
  const [totalPrice, setTotalPrice] = useState(Number(props.price));
  const { addItem } = useCart();

  const increment = (prev: number) => {
    setCounter((prev) => prev + 1);
    setTotalPrice((prev) => prev + props.price);
  }

  const decrement = (prev: number) => {
    setCounter((prev) => prev - 1);
    setTotalPrice((_prev) => prev - props.price)
  }

  const addCart = () => {
    addItem({
      food: props,
      count: counter,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full absolute right-5 bottom-5 bg-white p-4"><Plus size={10} strokeWidth={2} className="text-red-500"/></Button>
      </DialogTrigger>
      <DialogContent className="grid grid-cols-2 min-w-3xl min-h-2/5 gap-9">
        <img src={`${props.image}`} className="h-full rounded-md" />
        <div className="flex flex-col justify-between">
          <div>
            <DialogTitle className="text-2xl font-semibold text-red-500 capitalize">{props.name}</DialogTitle>
            <DialogDescription className="text-base font-normal text-foreground">{props.ingredients}</DialogDescription>
          </div>
          <div>
            <div className="flex justify-between">
              <div>
                <p className="text-base font-normal">Total price</p>
                <h3 className="font-semibold text-2xl" >{`$${totalPrice}`}</h3>
              </div>
              <div className="flex gap-4 items-center">
                <Button onClick={decrement} disabled={counter == 1} size="icon" variant="outline" className="rounded-full"><Minus></Minus></Button>
                <p className="w-3">{counter}</p>
                <Button onClick={increment} size="icon" variant="outline" className="rounded-full"><Plus></Plus></Button>
              </div>
            </div>
            <Button type="submit" onClick={addCart} className="w-full mt-8">Add to cart</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
