module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
};