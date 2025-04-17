"use client";

import "../globals.css";
import { Header } from "../_components/Header";
import CartProvider from "@/providers/CartProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <CartProvider>
      <Header />
      {children}
      </CartProvider>
    </section>
  );
}
