"use client";
import { useLayoutEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");

    const decode = jwtDecode("token",);

    if (decode.user.role != "ADMIN") {
      router.push("/");
    }
  }, []);
  return <section>{children}</section>;
}