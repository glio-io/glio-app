module.exports = {
  devServer: {
    proxy: {
      '^/glio-api': {
        target: 'http://0.0.0.0:8080',
        changeOrigin: true
      },
    }
  },
  transpileDependencies: ["vuetify"],
};
