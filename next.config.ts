// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/:path+/",
        destination: "/:path+",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dionis-insurance.kz" }],
        destination: "https://dionis-insurance.kz/:path*",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://dionis-insurance.kz/:path*",
        statusCode: 301,
      },
    ];
  },
  images: {
    // ВАЖНО: добавляем мелкие ширины сюда (deviceSizes), не только в imageSizes
    deviceSizes: [
      140,
      200,
      224,
      320,
      360,
      384,
      400,
      420,
      448,
      480,
      512,
      576,
      640,
      750,
      828,
      1024,
      1200,
      1440,
      1920,
    ],
    imageSizes: [
      16, 24, 32, 40, 48, 64, 70, 96, 128, 140, 160, 200, 224, 256,
    ],
    qualities: [60, 70, 75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dionis-insurance.kz",
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
