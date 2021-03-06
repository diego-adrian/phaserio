const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Para injectar el bundle a un template
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Para limpiar todo lo que se quede en dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Para separar todo lo css del bundle
const webpack = require('webpack');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Phaser',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // Para imagenes
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      // Para fuentes o archivos svg
      {
        test: /\.(wolff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline'
      },
      // Para estilos scss / css
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 9090
  }
};
