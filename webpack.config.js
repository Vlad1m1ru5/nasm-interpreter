const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = process.env.NODE_ENV;
const isDevMode = mode === "development";
const devtool = isDevMode ? "inline-source-map" : "source-map";

module.exports = {
  mode,
  devtool,
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, "dist"),
    open: true
  },
  entry: {
    "index": path.resolve("./src")
  },
  output: {
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    alias: {
      "app": path.resolve(__dirname, "./src/app"),
      "component": path.resolve(__dirname, "./src/component"),
      "stack-machine": path.resolve(__dirname, "./src/stack-machine")
    },
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html")
    })
  ]
};