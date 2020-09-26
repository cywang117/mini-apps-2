module.exports = {
  globals: {
    NODE_ENV: 'test'
  },
  collectCoverage: true,
  coverageDirectory: 'test/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/public/',
    '/lcov-report/'
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!server.js', // Only 16 lines, just serves the public folder. Not much use in testing
    '!client/index.js', // 6 lines, mounts tested App.js with ReactDOM
    '!**/*.html',
    '!.babelrc',
    '!**/*.config.js',
    '!**/styles.js'
  ],
  coverageThreshold: {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80
    }
  },
  testEnvironment: 'jsdom',
  verbose: true
};
