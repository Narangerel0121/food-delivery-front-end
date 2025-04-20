"use client"

import { Button } from "@/components/ui/button";
import FoodMenu from "./_components/FoodMenu";
import FoodForm from "./_components/FoodForm";


const Admin = () => {    
    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="p-4">
                <div className="flex gap-4 pb-8">
                    <img src="assets/cap.svg" />
                    <div>
                        <h3>NomNom</h3>
                        <p>Swift delivery</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div><Button className="w-1/2 rounded-full">Food Menu</Button></div>
                    <div><Button className="w-1/2 rounded-full">Orders</Button></div>
                    <div><Button className="w-1/2 rounded-full">Settings</Button></div>
                </div>
            </div>
            <div className="col-span-4 m-10">
                <FoodMenu />
            </div>
        </div>
    );
};

export default Admin;