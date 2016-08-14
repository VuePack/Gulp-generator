/*
* @Author: leon
* @Date:   2016-08-14 01:12:26
* @Last Modified by:   kevinli
* @Last Modified time: 2016-08-15 01:32:12
*/

var webpack = require('webpack'),
    path = require('path'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    fs = require('fs'),
    uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');

function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    return files;
}


module.exports = {
    entry: getEntry(),
    output: {
      path: path.join(__dirname, "dist/js/"),
      filename: '[name].js'
    },
    module: {
      loaders: [
          {
            test: /\.js[x]?$/,
            loaders: ['babel-loader?presets[]=es2015'],
            exclude: /node_modules/,
            include: path.join(__dirname, '.')
          },
          { test: /\.scss$/, loader: 'style!css!scss'},
          { test: /\.vue$/, loader: 'vue'}

        ]
    },
    babel: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
    },
    resolve: {
        alias: {
            js: path.join(__dirname,  "./src/js")
        },
        extensions: ['', '.js', '.vue'],
    },
    plugins: [
      new uglifyJsPlugin({
          compress: {
              warnings: false
          }
      })
    ]
};
