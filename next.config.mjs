import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (Array.isArray(config.resolve.alias))
        config.resolve.alias.push({ name: "msw/browser", alias: false });
      else config.resolve.alias["msw/browser"] = false;
    } else {
      if (Array.isArray(config.resolve.alias))
        config.resolve.alias.push({ name: "msw/node", alias: false });
      else config.resolve.alias["msw/node"] = false;
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // 원하는 옵션 추가
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "www.50plus.or.kr",
      "s3.ap-northeast-2.amazonaws.com",
      "www.songpawoman.org",
      "mapo50.org",
      "50plus.or.kr",
      "mapo50.com",
    ],
  },
};

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
