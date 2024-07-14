/** @type {import('next').NextConfig} */
import path from 'path';

// Function to get the directory name (__dirname equivalent)
function getDirname(importMetaUrl) {
    const __dirname = path.dirname(new URL(importMetaUrl).pathname);
    return __dirname;
}
const currentDir = getDirname(import.meta.url);

const nextConfig = {
    reactStrictMode: true,
    // transpilePackages: ["@repo/ui"],
    output: "standalone",
    experimental: {
      outputFileTracingRoot: path.join(currentDir, "../../"),
    },
    webpack: function (config, {isServer}) {
      if (!isServer) {
        // Setting `resolve.alias` to `false` will tell webpack to ignore a module.
        // `msw/node` is a server-only module that exports methods not available in
        // the `browser`.
        config.resolve.alias = {
          ...config.resolve.alias,
          'msw/node': false,
        };
      }
      config.experiments = {
        asyncWebAssembly: true,
        layers: true,
      };
      return config;
    },
  };
export default nextConfig;
