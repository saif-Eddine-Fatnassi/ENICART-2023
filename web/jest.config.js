module.exports = {
  verbose: true,
  silent: false,
  clearMocks: true,
  collectCoverage: true,
  setupFilesAfterEnv: ["<rootDir>/config/setupTest.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.jsx$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/__mocks__/fileTransformer.js",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/__mocks__/fileMocks.js",
    "\\.(css|scss|less)$": "<rootDir>/tests/__mocks__/styleMocks.js",
  },
}
