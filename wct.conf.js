module.exports = {
  suites: [
    'test',
  ],
  expanded: true,
  plugins: {
    local: {
      browsers: [
        'chrome',
        'firefox',
      ],
    },
    istanbul: {
      dir: './coverage',
      reporters: [
        'text',
        'text-summary',
        'lcov',
        'json',
      ],
      include: [
        '**/code-sample.js',
      ],
      exclude: [
        '/polymer/polymer.js',
        '/platform/platform.js',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
    sauce: {
      browsers: [{
        browserName: 'MicrosoftEdge',
        platform: 'Windows 10',
        version: '17.17134',
      }, {
        browserName: 'safari',
        platform: 'macOS 10.13',
        version: '11.0',
      }],
    }
  },
};
