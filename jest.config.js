const config = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "node",
  timers: 'modern',
  testTimeout: 10000,
}

const testEnv = process.env.TEST_ENV
if (testEnv === 'e2e') {
  config.testMatch = [
    '**/?(*.)+(e2e).[tj]s?(x)'
  ]
}

module.exports = config
