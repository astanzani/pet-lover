module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv'],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@config': './src/config',
            '@types': './src/types',
            '@graphql/mutations': './src/graphql/mutations',
            '@graphql/queries': './src/graphql/queries',
            '@generated/graphql': './src/generated/graphql',
          },
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.json',
            '.tsx',
            '.ts',
            '.native.js',
          ],
        },
      ],
      ['react-native-reanimated/plugin'],
    ],
  };
};
