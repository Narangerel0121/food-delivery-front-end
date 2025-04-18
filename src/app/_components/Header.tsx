"use client"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthProvider";
import { useCart } from "@/providers/CartProvider";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react"
import Link from "next/link";

const Header = () => {
    const { user, token, logout, } = useAuth();
    const { setOpen } = useCart()
    return (
        <div>
            <div className="flex gap-10">
                {user ? (
                    <>
                        <h1>{user.email}</h1>
                        <Button onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </div>
                )}
            </div>
            <div className="bg-black text-white flex justify-between w-full px-22 py-4">
                <div className="flex gap-2 items-center w-full">
                    <img src="/assets/cap.svg" />
                    <div>
                        <h5>NomNom</h5>
                        <p>Swift delivert</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white rounded-full">
                        <Button size="icon" className="rounded-full bg-transparent"><MapPin size={13} color="#ef4444" strokeWidth={2} /></Button>
                        <p className="text-nowrap text-red-500 text-xs">Delivery address:</p>
                        <input placeholder="Add location" className="pl-3 w-fit text-xs outline-none placeholder: text-gray-700"></input>
                        <Button size="icon" className="bg-transparent"><ChevronRight size={16} color="rgba(24, 24, 27, 0.5)" strokeWidth={2} /></Button>
                    </div>
                    <Button size="icon" variant="outline" onClick={() => setOpen(true)} className="bg-white p-4 rounded-full"><ShoppingCart size={16} color="#000000" strokeWidth={1} /></Button>
                    <Button size="icon" className="bg-red-500 p-4 rounded-full"><User size={16} color="#ffffff" strokeWidth={1} /></Button>
                </div>
            </div>
        </div>
    )
}

export { Header }