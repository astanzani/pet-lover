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
      '@db/users': path.resolve(__dirname, './src/db/users'),
      '@db/pets': path.resolve(__dirname, './src/db/pets'),
      '@services/users': path.resolve(__dirname, './src/services/users'),
      '@services/pets': path.resolve(__dirname, './src/services/pets'),
      '@types': path.resolve(__dirname, './src/types'),
      '@s3': path.resolve(__dirname, './src/s3'),
    },
  },
  target: 'node',
};
