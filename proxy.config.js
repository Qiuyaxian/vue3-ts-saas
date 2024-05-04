module.exports = {
  '/api': {
    target: 'http://localhost:3000/',	//实际请求地址
    changeOrigin: true,
    rewrite: (path) => {
      return path.replace(/^\/api/, '/mock')
    }
  }
}
