const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: path.resolve(__dirname, 'src/'),
              outputPath: './',
              publicPath: '../',
              useRelativePaths: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },

      { test: /\.hbs$/, loader: 'handlebars-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './src/views/partials/header.html'),
      location: 'header',
      template_fileName: ['index.html'],
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './src/views/partials/about-us.html'),
      location: 'about',
      template_fileName: ['index.html'],
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './src/views/partials/service.html'),
      location: 'service',
      template_fileName: ['index.html'],
    }),
    new HTMLWebpackPlugin({
      template:
        'url-replace-loader!extract-loader!html-loader!ejs-compiled-loader!src/views/home.ejs',
      filename: 'home.html',
      chunks: ['vendor', 'home'],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000,
  },
};
