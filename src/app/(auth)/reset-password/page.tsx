"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ResetPassword = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const paramToken = searchParams.get("token");
        setToken(paramToken)
    }, [searchParams])


    const resetPassword = async () => {
        const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
            userEmail: emailRef.current.value
        })

        toast("Email successfully sent");
    };

    const updatePassword = async () => {
        if (!token) return;
        const decode = jwtDecode(token as string);
        
        const response = await axios.post(`${BASE_URL}/auth/update-password`, {
            id: decode.user?.id, password: passwordRef.current.value
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

    }

    return (
        <div className="grid grid-cols-5">
            {!token ? (
                <div className="place-self-center col-span-2 w-1/2 space-y-6">
                    <Input ref={emailRef} placeholder="Enter your email" />
                    <Button onClick={resetPassword} className="w-full">Let's go</Button>
                </div>
            )
                : (
                    <div className="place-self-center col-span-2 w-1/2 space-y-6">
                        <Input ref={passwordRef} placeholder="Enter your new password" type="password" />
                        <Button onClick={updatePassword} className="w-full">Let's go</Button>
                    </div>
                )}
            <div className="col-span-3">
                <img src="./assets/loginImage.png" className="w-full h-auto rounded-lg p-5" />
            </div>
        </div>
    )
}

export default ResetPassword 