module.exports = {
    configureWebpack: {
        devServer: {
            proxy: 'http://114.116.226.129:16666'
            // proxy: {
            //     "/api": {
            //         target: "http://114.116.226.129:16666",
            //         changeOrigin: true,
            //         pathRewrite: {'^/api' : ''}
            //     }
            // }
        }
    }
}
  