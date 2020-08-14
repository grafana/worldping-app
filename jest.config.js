// This file is needed because it is used by vscode and other tools that
// call `jest` directly.  However, unless you are doing anything special
// do not edit this file

const standard = require('@grafana/toolkit/src/config/jest.plugin.config');

// This process will use the same config that `yarn test` is using
const config = standard.jestConfig();
// Adding jest-environment-jsdom-fifteen because the jsdom included with @grafana/toolkit doesn't play nice with the current version of @testing-library
config.testEnvironment = 'jest-environment-jsdom-fifteen';
config.setupFilesAfterEnv = ['@testing-library/jest-dom/extend-expect'];
config.maxConcurrency = 1;
module.exports = config;
