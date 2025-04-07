import { BASE_URL } from "@/app/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env : {
    BASE_URL: process.env.BASE_URL,
  }
};

export default nextConfig;
