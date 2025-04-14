import { BASE_URL } from "@/app/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https"
      },
      {
        hostname: "*",
        protocol: "http"
      },
    ],
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  }
};

export default nextConfig;
