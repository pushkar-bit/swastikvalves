/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ]
    }
  ],
  redirects: async () => [
    { source: '/3-piece-ball-valves-maufacturers-india-punjab-ab.html', destination: '/about', permanent: true },
    { source: '/ball-valves-manufacturers-india-punjab-india-pro.html', destination: '/products', permanent: true },
    { source: '/3-piece-ball-valves-manufacturer-india-punjab.html', destination: '/products/3-piece-ball-valves', permanent: true },
    { source: '/three-piece-ball-valves-manufacturer-india-punjab.html', destination: '/products/three-piece-ball-valves', permanent: true },
    { source: '/gun-metal-foot-valves-manufacturer-india-punjab.html', destination: '/products/gun-metal-foot-valves', permanent: true },
    { source: '/three-piece-ball-valves-manufacturers-india-punjab-quality.html', destination: '/quality', permanent: true },
    { source: '/screwed-end-ball-valves-indigo-punjab-infra.html', destination: '/infrastructure', permanent: true },
    { source: '/gun-metal-ball-valves-manufacturers-india-punjab-enq.html', destination: '/enquiry', permanent: true },
    { source: '/gun-metal-foot-valves-manufacturers-india-punjab-cont.html', destination: '/contact', permanent: true },
    { source: '/index.html', destination: '/', permanent: true },
  ]
};

export default nextConfig;
