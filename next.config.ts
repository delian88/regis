import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.nigeriapropertycentre.com",
      },
      {
        protocol: "https",
        hostname: "assets.nigeriapropertycentre.com",
      },
      {
        protocol: "https",
        hostname: "ddo5o3z2xgpp2.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "regis.com.ng",
      },
      {
        protocol: "https",
        hostname: "www.regis.com.ng",
      },
    ],
  },
};

export default nextConfig;
