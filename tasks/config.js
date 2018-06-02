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
    sources: '**/*.{html,js,css}'
  }
};
