/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
let objectProject = {
    index: {
        entry: 'src/main.js', // page 的入口
        template: 'src/public/index.html', // 模板来源
        filename: 'index.html', // 在 dist/index.html 的输出
        // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index']

    }
}
let page = objectProject;

// var currDate = (new Date()).getFullYear() + '-' + ((new Date()).getMonth()+1) + '-' + (new Date()).getDate() + '_' + (new Date()).getHours() + ':' + (new Date()).getMinutes()
var currDate = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
var times = (new Date()).getHours() + '-' + (new Date()).getMinutes();

module.exports = {
    // publicPath: '/', // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
    publicPath: '',
    assetsDir: 'assets',
    outputDir: 'dist/' + currDate + '/' + times, //标识是打包哪个文件
    pages: page,
    productionSourceMap: false,

    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,

    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,

    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],

    // 生产环境 sourceMap
    productionSourceMap: false,

    // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
    // corsUseCredentials: false,
    // webpack 配置，键值对象时会合并配置，为方法时会改写配置
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    configureWebpack: (config) => {},

    // webpack 链接 API，用于生成和修改 webapck 配置
    // https://github.com/mozilla-neutrino/webpack-chain
    chainWebpack: (config) => {
        // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
        config.optimization
            .splitChunks({
                cacheGroups: {}
            });

        // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
        // config.module
        //   .rule('eslint')
        //   .exclude
        //   .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
        //   .end()
    },

    // 配置高于chainWebpack中关于 css loader 的配置
    // css: {
    //   // 是否开启支持 foo.module.css 样式
    //   modules: false,

    //   // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    //   extract: true,

    //   // 是否构建样式地图，false 将提高构建速度
    //   sourceMap: false,

    //   // css预设器配置项
    //   loaderOptions: {
    //     css: {
    //       // options here will be passed to css-loader
    //     },

    //     postcss: {
    //       // options here will be passed to postcss-loader
    //     }
    //   }
    // },

    devServer: {
        // proxy: 'http://www.kuaidi100.com',       //动态代理ip
        // proxy: 'http://192.168.1.191:8035',      //威哥
        proxy:'http://192.168.1.221:8035',       //平哥
        // proxy:'http://120.24.237.109:8035',      //测试服务器
        index: '/index.html',
        open: false, // 项目构建成功之后，自动弹出页面
        host: '0.0.0.0', // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
        port: 8081, // 端口号，默认8080
        https: false, // 协议
        hotOnly: false, // 没啥效果，热模块，webpack已经做好了
        // proxy:{
        //   '/download': {
        //     target: 'http://wxhayashi.oss-cn-beijing.aliyuncs.com',
        //     ws: true,
        //     changeOrigin:true,//允许跨域
        //     pathRewrite: {
        //       '^/download': '/download'
        //     }
        //   }    
        // }
    },

    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,

    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // 第三方插件配置
    pluginOptions: {}
}