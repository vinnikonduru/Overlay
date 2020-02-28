const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require('path')


module.exports = {
    // devtool: 'source-map',

     entry: {
      "index.js" : "./src/index.js",
    },

    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name]',
    },
    devServer: {
      contentBase:'./dist',
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.html$/,
            use: {
                loader: "html-loader",
                options: { minimize: true }
            }
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
          // chunks:['index.js','sw.js'],
          chunks:['index.js'],
          template: "./src/index.html",
          filename: "./index.html",
          // favicon: "",
      }),
      new MiniCssExtractPlugin({
          filename: "[name].css",
          // filename: "main.css",
          chunkFilename: "[id].css"
      })
  ],
    devServer: {
      port: 3000,
      // openPage: "protected",
    }
  };