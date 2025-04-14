"use client";
import { useLayoutEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { DecodedTokenType } from "../(auth)/login/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");

    const decode: DecodedTokenType = jwtDecode(token);

    if (decode.user.role != "ADMIN") {
      router.push("/");
    }
  }, []);
  return <section>{children}</section>;
}