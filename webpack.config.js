require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const options = {
    min: !isDevelopment ? '.min' : '',
    sfname: isDevelopment ? '[name]-' : '',
    date: Date.now(),
    paths: {
      root: __dirname,
      build: path.resolve(__dirname, './dist'),
      src: path.resolve(__dirname, './src'),
      public: '/',
    },
    env: ['GRAPHQL_URL'],
  };

  const config = {
    target: 'web',
    mode: isDevelopment ? 'development' : 'production',
    entry: path.resolve(options.paths.src, './index.js'),
    output: {
      path: options.paths.build,
      filename: `js/[name]-[hash]-${options.date}${options.min}.js`,
      chunkFilename: `js/chunks/[id]-[chunkhash]-${options.date}${
        options.min
      }.chunk.js`,
      hashDigest: 'base64',
      publicPath: options.paths.public,
    },
    devtool: isDevelopment && 'cheap-module-source-map',
    resolve: {
      unsafeCache: isDevelopment,
      extensions: ['.js', '.jsx', '.json'],
      modules: ['node_modules', options.paths.src],
      alias: {
        '@app': path.resolve(options.paths.src),
      },
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            cache: false,
            emitWarning: false,
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader?cacheDirectory',
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|webm)$/,
          loader: `url-loader?limit=512&name=static/${
            options.sfname
          }[sha512:hash:base64:5].[ext]`,
        },
      ],
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `[name]-[contenthash]-${options.date}${options.min}.css`,
        chunkFilename: `[id]-${options.date}${options.min}.chunk.css`,
      }),
      new CleanWebpackPlugin(options.paths.build, {
        verbose: true,
        root: options.paths.root,
      }),
      new webpack.EnvironmentPlugin(options.env),
      new webpack.ProvidePlugin({
        Promise: 'bluebird',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(options.paths.src, 'index.html'),
      }),
    ],
    devServer: {
      publicPath: '/',
      contentBase: options.paths.build,
      historyApiFallback: true,
      open: true,
      port: 3000,
      hot: isDevelopment,
      noInfo: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },
  };

  if (isDevelopment) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NamedModulesPlugin());

    if (env === 'wds') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerPort: 3001,
        }),
      );
    }
  }

  return config;
};
