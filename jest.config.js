const config = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "node",
  testTimeout: 10000,
  runner: 'groups',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}

module.exports = config
