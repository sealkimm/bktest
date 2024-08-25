const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssScss = require('postcss-scss');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/bktest/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: ['./src/@inc'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            const filePath = pathData.filename.replace(/^src\//, '');
            return filePath;
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/main.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/about.html',
      filename: 'sub/about/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/brands.html',
      filename: 'sub/brands/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/franchise.html',
      filename: 'sub/franchise/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/contact.html',
      filename: 'sub/contact/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/brand.html',
      filename: 'sub/brand/index.html',
    }),
    new StylelintPlugin({
      files: './src/scss/**/*.scss',
      fix: true,
      customSyntax: postcssScss,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
};
