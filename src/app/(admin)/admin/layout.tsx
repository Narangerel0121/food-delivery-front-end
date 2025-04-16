"use client";
import { useLayoutEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type UserType = {
  user: {
    role: string;
  };
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const decode: UserType = jwtDecode(token as string);

    if (decode.user.role != "ADMIN") {
      router.push("/");
    }
  }, []);

  return <section>{children}</section>;
}