/** @type {import('next').NextConfig} */
const nextConfig = {
  // Per-agent build isolation: concurrent agents set NEXT_DIST_DIR so they do not
  // clobber each other's .next. Unset in normal use.
  distDir: process.env.NEXT_DIST_DIR || '.next',
};
export default nextConfig;
