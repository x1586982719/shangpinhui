const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  // 关闭eslint校验工具
  lintOnSave: false,
  devServer:{
    proxy:{
    '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
    }
    }
  }
})
