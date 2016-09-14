/*
 * @Author: leon
 * @Date:   2016-08-14 01:12:26
 * @Last Modified by:   kevin li
 * @Last Modified time: 2016-09-14 19:35:10
 */


var path           = require('path');
fs                 = require('fs'),
webpack            = require('webpack'),
CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
ExtractTextPlugin  = require("extract-text-webpack-plugin"),
uglifyJsPlugin     = webpack.optimize.UglifyJsPlugin,
srcDir             = path.resolve(process.cwd(), 'src');

function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs   = fs.readdirSync(jsPath);
    var matchs = [],
    files      = {};
    dirs.forEach(function(item) {
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
        path: './dist/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
                test: /\.js[x]?$/,
                loaders: ['babel-loader?presets[]=es2015'],
                exclude: /node_modules/,
                include: path.join(__dirname, '.')
            },
            { test: /.scss$/, loaders: ["style", "css", "sass"] },
            { test: /\.vue$/, loader: 'vue' }

        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        alias: {
            js: path.join(__dirname, "./src/js")
        },
        extensions: ['', '.js', '.vue'],
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "init",
            minChunks: 2,
            chunks: getEntry()
        }),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
