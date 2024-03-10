module.exports = {
  publicRuntimeConfig: {
    site: {
      name: "",
      url:
        process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
      title: "",
      description: "",
      socialPreview: "",
    },
  },
  swcMinify: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};
