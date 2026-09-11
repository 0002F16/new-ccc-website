/** @type {import('next').NextConfig} */
const nextConfig = {
  // Per-agent build isolation: concurrent agents set NEXT_DIST_DIR so they do not
  // clobber each other's .next. Unset in normal use.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  images: {
    // Default deviceSizes top out at 3840. Nothing on this page is anywhere near
    // that: the largest source is a 900px proof-wall screenshot and the widest
    // slot it ever fills is ~371px. next/image points the fallback `src` at the
    // LARGEST candidate, so with the defaults a browser that fell back — which
    // happens while a multi-column container is reflowing — asked the optimiser
    // to upscale a 900px screenshot to 3840px. Those requests never finished and
    // four tiles stayed blank. Capping the ladder makes that unrepresentable.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Default is 60s, so browsers revalidated every optimised image each minute.
    // Sources in /public only change with a deploy, so cache for 31 days.
    minimumCacheTTL: 2678400,
  },
};
export default nextConfig;
