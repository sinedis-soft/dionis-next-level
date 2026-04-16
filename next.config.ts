// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/ru/about",
        permanent: true,
      },
      {
        source: "/green-card",
        destination: "/ru/green-card",
        permanent: true,
      },
      {
        source: "/osago-rf",
        destination: "/ru/osago-rf",
        permanent: true,
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
    formats: ["image/webp"],
  },
};

export default nextConfig;
