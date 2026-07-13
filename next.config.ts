import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Standalone output is only needed for the Docker image (see Dockerfile).
// Local/CI builds omit it so `next start` serves the regular .next build (e.g. for e2e).
const nextConfig: NextConfig = {
  output: process.env.BUILD_STANDALONE === '1' ? 'standalone' : undefined,
};

export default withNextIntl(nextConfig);
