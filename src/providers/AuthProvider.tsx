"use client"
import { DecodedTokenType, ValueType } from "@/app/(auth)/login/page";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { toast } from "sonner";

type LoginType = {
    email: string;
    password: string;
}

type UserType = {
    email: string;
    password: string;
    // createdAt: string;
    // updatedAt: string;
    role: string;
    id: string;
}

type ContextType = {
    user: UserType | null;
    token: string | null;
    login: (_value: LoginType) => void;
    logout: () => void;
    error: string | null;
}

// default value
const AuthContext = createContext({
    user: null,
    token: null,
    login: () => { },
    logout: () => { }
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<null | UserType>(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    const login = async (value: ValueType) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, value);
            console.log(response.data.token, "user info")
            if (response) {
                toast("User successfully login.");
            }

            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);

            const decodedToken: DecodedTokenType = jwtDecode(response.data.token);
            console.log(decodedToken);

            setUser(decodedToken.user)
            if (decodedToken.user.role == "ADMIN") {
                router.push('/admin');
                return;
            } else {
                router.push('/')
            }

        } catch (error: any) {
            console.log(error, "error")
            setError(error.response.data.error)
            // setError(error.message)
        }
    }

    const logout = () => {
        console.log("logout funciton")
    }

    return (
        <AuthContext.Provider value={{ user, token, register, error, login, logout }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext)
}