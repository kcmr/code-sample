const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('webpack-merge');

module.exports = (config) => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        {
          pattern: config.grep ? config.grep : 'test/**/*.test.js',
          type: 'module'
        }
      ],

      client: {
        mocha: {
          ui: 'tdd',
          reporter: 'html'
        }
      },

      coverageIstanbulReporter: {
        thresholds: {
          global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100
          }
        }
      },

      esm: {
        nodeResolve: true
      }
    })
  );

  return config;
};
