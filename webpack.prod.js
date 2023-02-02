const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        ],
      },
    ],
  },
});
