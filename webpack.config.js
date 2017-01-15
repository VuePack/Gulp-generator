/*
 * @Author: Leon
 * @Date: 2017-01-01 16:27:20
 * @Last Modified by: Leon
 * @Last Modified time: 2017-01-15 12:28:22
 */

const path = require('path')
const webpack = require('webpack')
const glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const API_CONFIG = require('./app/config/api')

const entries = {}
const chunks = []
const pages = getHtmls()
getEntriesAndChunks()

const config = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    // 配置别名，在项目中可缩减引用路径
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      pages: path.resolve(__dirname, './app/pages/'),
      config: path.resolve(__dirname, './app/config/'),
      store: path.resolve(__dirname, './app/store/'),
      util: path.resolve(__dirname, './app/util/'),
      assets: path.resolve(__dirname, './app/assets/'),
      com: path.resolve(__dirname, './app/scripts/components/'),
      view: path.resolve(__dirname, './app/scripts/view/'),
      root: path.join(__dirname, 'node_modules')
    }
  },
  module: {
    rules: [
      // 只lint *.vue 和 *.js 文件
      {
        enforce: 'pre',
        test: /.(vue|js)$/,
        loader: 'eslint-loader',
        query: {
          configFile: './.eslintrc.js'
        },
        exclude: /node_modules/
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      }, {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?name=/assets/font/[name].[ext]'
      }, {
        test: /\.(png|jpg|gif)\??.*$/,
        loader: 'url-loader?limit=10000&name=assets/img/[name].[hash:8].[ext]'
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/lib.[hash:8].min.js',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new ExtractTextPlugin({
      filename: 'assets/style/app.[hash:8].min.css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        postcss: [
          /**
           * [baseDpr description]
           * @type {Number}
           * “postcss-px2rem” 适配移动端插件
           */
          require('postcss-px2rem')({
            // baseDpr: 2, // base device pixel ratio (default: 2)
            // threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
            // remVersion: true, // whether to generate rem version (default: true)
            // remPrecision: 6, // rem precision (default: 6)
            remUnit: 75 // rem unit value (default: 75)
          }),
          require('autoprefixer')({
            browsers: ['Firefox >= 20', '> 5%', 'last 2 versions']
          })
        ]
      }
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    inline: true,
    historyApiFallback: false,
    noInfo: false,
    stats: { colors: true },
    proxy: {
      // '*': {
      //   target: API_CONFIG.TARGET,
      //   host: '/',
      //   secure: false,
      // }
    }
  },
  devtool: '#eval-source-map',
  performance: {
    hints: false
  }
}

/**
 * [description]
 * @param  {Object} pathname) {               let conf [description]
 * @return {[type]}           [description]
 * “HtmlWebpackPlugin” 插件用于生产多个 html 文件
 * 例如 ：
 * {filename: 'main/login.html',
    template: 'app/pages/main/login/app.html',
    inject: 'body',
    chunks: [ 'vendors', 'main/login/app']
    },
    {...}
 */
pages.forEach(function (pathname) {
  // filename 用文件夹名字
  let conf = {
    filename: pathname.substring(6, pathname.length - 4) + '.html', // 生成的html存放路径，相对于path
    template: 'app/' + pathname + '.html' // html模板路径
  }
  let chunk = pathname.substring(6, pathname.length)
  if (chunks.indexOf(chunk) > -1) {
    conf.inject = 'body'
    conf.chunks = ['vendors', chunk]
  }
  // if (process.env.NODE_ENV === 'production') {
  //   conf.hash = true
  // }
  config.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = config

/**
 * [getEntriesAndChunks description]
 * @return {[type]} [description]
 * 获取 “pages” 所有目录下的 “.js 文件 （数组格式）
 * 例如 ：[ 'main/login/app','user/index/app']
 */
function getEntriesAndChunks() {
  glob.sync('./app/pages/**/*.js').forEach(function (name) {
    let n = name.slice(name.lastIndexOf('app/') + 10, name.length - 3)
    entries[n] = [name]
    chunks.push(n)
  })
}

/**
 * [getHtmls description]
 * @return {[type]} [description]
 * 获取 “pages” 所有目录下的 “.html” 文件 （数组格式）
 * 例如 ：[ 'pages/index/app','pages/main/index/app']
 */
function getHtmls() {
  let htmls = []
  glob.sync('./app/pages/**/*.html').forEach(function (name) {
    let n = name.slice(name.lastIndexOf('app/') + 4, name.length - 5)
    htmls.push(n)
  })
  return htmls
}

if (process.env.NODE_ENV === 'production') {
  // module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}