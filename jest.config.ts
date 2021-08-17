const path = require('path');
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  rootDir: '.',
  roots: ['./src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@types': '<rootDir>/src/types/*',
    '@db/(.*)$': '<rootDir>/src/db/$1',
  },
};
