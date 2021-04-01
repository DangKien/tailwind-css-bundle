// Dependencies
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "./src"),
  build: path.join(__dirname, "./build"),
  html: path.join(__dirname, "./src/templates/pages"),
};

const webpackConfig = {
  mode: process.env.NODE_ENV ? "production" : "development",
  entry: {
    index: `${PATHS.src}/scripts/index.js`,
  },
  output: {
    path: PATHS.build,
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${PATHS.html}/home.html.twig`,
      filename: "index.html",
      chunks: ["index"],
      title: "Homepage",
    }),
    new HtmlWebPackPlugin({
      template: `${PATHS.html}/about.html.twig`,
      filename: "about.html",
      chunks: ["index"],
      title: "About",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          minSize: 0,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
      {
        test: /\.twig$/,
        loader: "twig-loader",
      },
    ],
  },
};

if (process.env.NODE_ENV === "production") {
  webpackConfig.devtool = "source-map";
}
if (process.env.NODE_ENV === "development") {
}

module.exports = webpackConfig;
