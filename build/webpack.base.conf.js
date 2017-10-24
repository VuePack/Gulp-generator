var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var projectRoot = path.resolve(__dirname, '../')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')
var entries = getEntry('./src/module/*/*.js') // 获得入口js文件
var chunks = Object.assign(entries)

function getEntry(globPath) {
  var entries = {}, basename, tmp, pathname

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-3)
    pathname = tmp.splice(1, 1).toString().toLowerCase() // 正确输出js和html的路径
    entries[pathname] = entry
  })
  return entries
}

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: Object.assign(entries),
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].[hash:8].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue','.css'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common',
      '@': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('image/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style','css')
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks, // chunks是需要提取的模块
      minChunks: chunks.length
    }),
    // 配置提取出的样式文件
    new ExtractTextPlugin('css/[name].[hash:8].css')
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    // loaders: {
    //   css: ExtractTextPlugin.extract('style-loader','css-loader!less-loader')
    // },
    postcss: [
      /**
       * [baseDpr description]
       * @type {Number}
       * 字体单位用 `dpx`; 边框单位用 `rpx`; 其他宽度用 px 会自动转换为 rem
       * .cls {
            width: 75px;
            font-size: 12dpx
            border: 1rpx
          }
       *
       */
      // require('postcss-plugins-px2rem')({
      //   // baseDpr: 2, // base device pixel ratio (default: 2)
      //   // threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
      //   // remVersion: true, // whether to generate rem version (default: true)
      //   // remPrecision: 6, // rem precision (default: 6)
      //   remUnit: 75 // rem unit value (default: 75)
      // }),
      require('autoprefixer')({
        browsers: ['Firefox >= 20', '> 5%', 'last 2 versions']
      })
    ]
  }
}
