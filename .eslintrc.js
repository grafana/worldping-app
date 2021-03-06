module.exports = {
  extends: [
    '@grafana/eslint-config',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    // Since TS shows errors for unresolved imports anyway,
    // we can safely turn this off. (Plus, eslint doesn't play
    // nice with TS' baseUrl out of the box.)
    'import/no-unresolved': 'off',
    'react-hooks/exhaustive-deps': 'error',
  },
};
