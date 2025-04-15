import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"

export function DialogDemo(props: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full absolute left-66 top-40 bg-white p-4"><Plus size={10} color="#ef4444" /></Button>
      </DialogTrigger>
      <DialogContent className="grid grid-cols-2 min-w-3xl min-h-2/5 gap-4">
     {/* <Image
     src={`${props.image}`}
     width={500}
     height={364}
     alt={`${props.name}`}
     /> */}
     <img src={`${props.image}`} className="h-full rounded-md"/>
        <div className="flex flex-col justify-between">
          <div>
          <DialogTitle>{props.name}</DialogTitle>
          <p>{props.ingredients}</p>
          </div>
         <div>
         <div className="flex justify-between">
            <div>
              <p>Total price</p>
              <p>{`$${props.price}`}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Button size="icon" className="rounded-full"><Minus></Minus></Button>
              <p>1</p>
              <Button size="icon" className="rounded-full"><Plus></Plus></Button>
            </div>
          </div>
          <Button type="submit" className="w-full mt-8">Add to cart</Button>
         </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
