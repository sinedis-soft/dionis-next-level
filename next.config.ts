// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
