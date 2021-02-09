const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./chrome/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

const config = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    app: path.join(__dirname, "src/background.js"),
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js",
  },
  resolve: {
    extensions: ["*", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "adeptus-mechanicus-translator", // change this to your app title
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#000000",
      },
      manifest: "manifest.json",
      filename: "popup.html",
      template: "./static/popup.html",
      hash: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "chrome/icons",
          to: "icons",
        },
				{
          from: "static",
          to: "",
        },
      ],
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
};
module.exports = config;
