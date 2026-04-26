/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Files in /public are served by Vercel with `public, max-age=0,
  // must-revalidate` by default — every visit revalidates. The static
  // assets below never change between deploys (the hero/backdrop SVG
  // textures, the favicon, the resume PDF), so we can long-cache them
  // safely. If a file ever needs to change, rename it.
  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];
    return [
      { source: "/hero-blob.webp", headers: immutable },
      { source: "/backdrop-glows.webp", headers: immutable },
      { source: "/hero-blob.svg", headers: immutable },
      { source: "/backdrop-glows.svg", headers: immutable },
      { source: "/icon.svg", headers: immutable },
      { source: "/resume.pdf", headers: immutable },
      { source: "/fonts/:path*", headers: immutable },
    ];
  },
};

export default nextConfig;
