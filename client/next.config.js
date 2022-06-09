module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    images: {
      domains: ["ipfs.infura.io"],
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      staticFolder: "/static",
    },
    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          path: false,
          os: false,
        },
      };
      return config;
    },
  };
};
