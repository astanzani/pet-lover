const path = require('path');
const nodeExternals = require('webpack-node-externals');
const serverlessWebpack = require('serverless-webpack');

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  entry: serverlessWebpack.lib.entries,
  mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  node: false,
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      graphql$: path.resolve(__dirname, '../../node_modules/graphql/index.js'),
      '@db/users': path.resolve(__dirname, './src/db/users'),
      '@db/pets': path.resolve(__dirname, './src/db/pets'),
      '@db/posts': path.resolve(__dirname, './src/db/posts'),
      '@db/feed': path.resolve(__dirname, './src/db/feed'),
      '@db/followers': path.resolve(__dirname, './src/db/followers'),
      '@db/utils': path.resolve(__dirname, './src/db/utils'),
      '@services/users': path.resolve(__dirname, './src/services/users'),
      '@services/pets': path.resolve(__dirname, './src/services/pets'),
      '@services/posts': path.resolve(__dirname, './src/services/posts'),
      '@services/feed': path.resolve(__dirname, './src/services/feed'),
      '@services/followers': path.resolve(
        __dirname,
        './src/services/followers'
      ),
      '@types': path.resolve(__dirname, './src/types'),
      '@s3': path.resolve(__dirname, './src/s3'),
      '@generated/graphql': path.resolve(__dirname, './src/generated/graphql'),
    },
    mainFields: ['main'],
  },
  target: 'node',
};
