module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['<rootDir>/tests/**/*.(test|spec).ts'],
    setupFiles: ['<rootDir>/tests/setup-envs.ts'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup-files-after-env.ts'],
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1',
      '@test/(.*)': '<rootDir>/tests/$1',
      axios: 'axios/dist/node/axios.cjs'
    },
    restoreMocks: true,
    globals: {
      "ts-jest": {
        useBabelrc: true
      }
    },
  };