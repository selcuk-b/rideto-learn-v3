/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/modules/:moduleSlug",
        destination: "/courses/pre-cbt/modules/:moduleSlug",
        permanent: true,
      },
      {
        source: "/modules/:moduleSlug/lessons/:lessonSlug",
        destination: "/courses/pre-cbt/modules/:moduleSlug/lessons/:lessonSlug",
        permanent: true,
      },
      {
        source: "/modules/:moduleSlug/quiz",
        destination: "/courses/pre-cbt/modules/:moduleSlug/quiz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
