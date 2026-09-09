import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Превью в песочнице открывается с чужого хоста — разрешаем dev-origin'ы.
  allowedDevOrigins: ["*.e2b.app"],
};

export default nextConfig;
