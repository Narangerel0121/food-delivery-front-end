"use client"
import { DecodedTokenType } from "@/app/(auth)/login/page";
import { ErrorType } from "@/app/(auth)/register/page";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { toast } from "sonner";

type LoginType = {
    email: string;
    password: string;
}

type UserType = {
    email: string;
    password: string;
    role: string;
    id: string;
    // createdAt: string;
    // updatedAt: string;
}

type ContextType = {
    user: UserType | null;
    token: string | null;
    register: () => void;
    login: (_value: LoginType) => void;
    logout: () => void;
    error: string | null;
}

// default value
const AuthContext = createContext({
    user: null,
    token: null,
    error: "",
    login: (_value: any) => {},
    logout: () => {}
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState("");

    const router = useRouter();

    const login = async (value: LoginType) => {
        try {
            const user = await axios.post(`${BASE_URL}/auth/login`, value);
       
            if (user) {
                toast("User successfully login.");
            }

            localStorage.setItem("token", user.data.token);

            const decodedToken: DecodedTokenType = jwtDecode( user.data.token);

            console.log(decodedToken);

            if (decodedToken.user.role == "ADMIN") {
                router.push('/admin');
                return;
            } else {
                router.push('/')
            }

        } catch (error: unknown) {
            console.log(error, "error")
            // setError((error as ErrorType).response.data.error);
            setError((error as ErrorType).message);
        }
    }

    const logout = () => {}

    return (
        <AuthContext.Provider
            value={{ user, token, error, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}