module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }