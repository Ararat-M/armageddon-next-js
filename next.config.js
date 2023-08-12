/* eslint-disable */
const StylelintPlugin = require("stylelint-webpack-plugin");
const procces = require("process");

module.exports = {
  reactStrictMode: true,
  env: {
    API_KEY: procces.env.API_KEY
  },
  webpack: (config, options) => {
    config.plugins.push(new StylelintPlugin());
    return config;
  }
};