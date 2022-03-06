// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const configEnv = require("./config");
const Dotenv = require("dotenv-webpack");

const isProduction = !(process.env.NODE_ENV == "production");

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    host: configEnv.HOST,
    port: configEnv.PORT,
    liveReload: true,
    hot: false

  },
  plugins: [
    // new Dotenv(
    //   {
    //     path: "./development.env",
    //     safe: true
    //   }
    // ),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin()

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader,"css-loader"],
      },
      {
        // eot|svg|ttf|woff|woff2
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
        use: 'file-loader'
      },
      {
        test: /\.html$/i,
        use: "html-loader"
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: ['file-loader']
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    console.log('-----MODO PRODUCTION')
    
    // config.plugins.push(new MiniCssExtractPlugin());
  } else {
    console.log('-----MODO DESARROLLO:')
    config.mode = "development";
}
  return config;
};
