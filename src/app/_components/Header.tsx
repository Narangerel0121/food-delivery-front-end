import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin, ShoppingCart, User } from "lucide-react"

const Header = () => {
    return (
        <div className="bg-black text-white flex justify-between w-full px-22 py-4">
            <div className="flex gap-2 items-center w-full">
                <img src="/assets/cap.svg" />
                <div>
                    <h5>NomNom</h5>
                    <p>Swift delivert</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center bg-white px-3 py-2 rounded-full">
                    <Button size="icon" className="rounded-full bg-transparent"><MapPin size={13} color="#ef4444" strokeWidth={2} /></Button>
                    <p className="text-nowrap text-red-500 text-xs">Delivery address:</p>
                    <input placeholder="Add location" className="pl-3 outline-none placeholder: text-gray-700 placeholder:text-xs"></input>
                    <Button size="icon" className="bg-transparent"><ChevronRight size={16} color="rgba(24, 24, 27, 0.5)" strokeWidth={2} /></Button>
                </div>
                <Button size="icon" variant="outline" className="bg-white p-4 rounded-full"><ShoppingCart size={16} color="#000000" strokeWidth={1} /></Button>
                <Button size="icon" className="bg-red-500 p-4 rounded-full"><User size={16} color="#ffffff" strokeWidth={1} /></Button>
            </div>
        </div>
    )
}

export { Header }