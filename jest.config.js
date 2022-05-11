module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageReporters: ['clover', 'cobertura', 'json', 'json-summary', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  globalSetup: './jest-global-setup.js',
  reporters: ['default'],
  moduleNameMapper: {
    '^@services(.*)$': '<rootDir>/src/services$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [],
  testRegex: 'tests/.*.test.(ts|tsx)$',
  testTimeout: 5000
};
