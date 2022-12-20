/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/"],
  testEnvironment: "jsdom",
};
