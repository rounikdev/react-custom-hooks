module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  globalSetup: './jest-global-setup.js',
  reporters: ['default'],
  moduleNameMapper: {
    '^@services(.*)$': '<rootDir>/src/services$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [],
  testRegex: 'tests/.*.test.(ts|tsx)$',
  testTimeout: 20000
};

