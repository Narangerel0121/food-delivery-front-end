"use client";

import "../globals.css";
import { Header } from "../_components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
