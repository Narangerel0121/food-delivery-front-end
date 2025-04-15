"use client";
import { useLayoutEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { DecodedTokenType } from "@/app/(auth)/login/page";
import { useAuth } from "@/providers/AuthProvider";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuth;
  useLayoutEffect(() => {
    if (user.role != "ADMIN") {
      router.push("/");
    }
  }, []);
  return <section>{children}</section>;
}