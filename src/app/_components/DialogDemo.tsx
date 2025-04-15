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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

export function DialogDemo(props: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button size="icon" variant="outline" className="rounded-full absolute left-66 top-40 bg-white p-4"><Plus size={10} color="#ef4444" /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.name}</DialogTitle>
          <DialogDescription>
            {props.ingredients}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button type="submit">Add to cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
