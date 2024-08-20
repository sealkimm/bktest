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
    publicPath: '/bktest/', // 웹서버의 루트 디렉토리로 설정입니다
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
              searchPaths: ['./src/@inc'], // 템플릿 파일의 경로 설정
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // CSS를 별도 파일로 추출
          'css-loader', // CSS를 CommonJS로 변환
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // CSS를 별도 파일로 추출
          'css-loader', // CSS를 CommonJS로 변환
          'sass-loader', // SCSS를 CSS로 컴파일
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            // 원본 경로를 유지하면서 'img' 폴더로 이동
            const filePath = pathData.filename.replace(/^src\//, '');
            return filePath;
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/main.html', // main index
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/about.html',
      filename: 'bktest/about.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/brands.html',
      filename: 'bktest/brands.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/franchise.html',
      filename: 'bktest/franchise.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/contact.html',
      filename: 'bktest/contact.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/brand.html',
      filename: 'bktest/brand.html',
    }),
    new StylelintPlugin({
      files: './src/scss/**/*.scss',
      // configFile: '.stylelintrc',
      fix: true, // 자동 수정 기능을 활성화
      customSyntax: postcssScss,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // 추출된 CSS 파일의 이름
    }),
  ],
  devServer: {
    // host: 'localhost',
    open: true, // npm run dev 시 자동으로 브라우저 open
    static: {
      directory: path.join(__dirname, 'dist'), // 이거하면 npm run dev해도 저장이 안됨?? 그러나 깃허브 배포할때 해야됨!
    },
  },
};
