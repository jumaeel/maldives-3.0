import type { NextConfig } from "next";

// On GitHub Pages the site is served from https://<user>.github.io/<repo>/,
// so we need a basePath. The deploy workflow sets PAGES_BASE_PATH to the repo
// name automatically; locally it's empty so `npm run dev` works at "/".
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export", // static HTML export for free static hosting (GitHub Pages)
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
