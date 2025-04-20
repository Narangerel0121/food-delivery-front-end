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
import { BASE_URL } from "@/constants"
import axios from "axios"
import { Plus } from "lucide-react"
import { useRef, useState } from "react"

type ValueType = {
    name: string
}

export function CategoryDialog() {
   const [value, setValue] = useState("");

    const onClick = async () => {
        const token = localStorage.getItem("token");
        const createCategory = await axios.post(`${BASE_URL}/categories`,{name: value}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(createCategory)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" className="rounded-full bg-red-500"><Plus></Plus></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new category</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Category name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Type category name"
                           onChange={(event) => setValue(event?.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onClick}>Add category</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
