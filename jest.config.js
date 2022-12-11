

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@App/(.*)$': '<rootDir>/src/functions/$1',
      '^@libs/(.*)$': '<rootDir>/src/libs/$1',
      '^@serverless/(.*)$': '<rootDir>/serverless-config/$1',
    },
  };