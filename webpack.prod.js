/** @type {import('webpack').Configuration} */
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ForkTsChecker = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.ts',
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local]__[hash:base64]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main'],
      inject: 'head',
      scriptLoading: 'defer',
    }),
    new ForkTsChecker({
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new CleanWebpackPlugin(),
  ],
};
