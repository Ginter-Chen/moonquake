const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = ({
  css: {
    loaderOptions: {
      scss: {
          additionalData: `@import "src/assets/scss/style-import.scss";`,  // 共同import
          sassOptions: {
              includePaths: [
                  'src/assets/scss'
              ]
          },

      }, // end: scss,
  }
  },
  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src'))
        .set('assets', resolve('src/assets')) //静态文件前要加~，否则只会以当前目录为基准
        .set('components', resolve('src/components'))
        .set('views', resolve('src/views'))
        .set('store', resolve('src/store'));

  

}
  

})


