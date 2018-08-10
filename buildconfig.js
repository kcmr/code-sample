module.exports = {
  server: {
    port: 5000,
    open: false,
    notify: false,
    ghostMode: false,
    reloadOnRestart: true,
    proxy: 'localhost:{{port}}/components/{{component}}/',
  },
  watch: {
    dist: [
      'themes/**/*',
    ],
  },
  pixtorem: {
    exclude: [
      'border',
      'box-shadow',
      'border-radius',
    ],
  },
  autoprefixer: {
    flexbox: 'no-2009',
  },
  inlineSource: {
    compress: false,
    swallowErrors: true,
    pretty: true,
  },
};
