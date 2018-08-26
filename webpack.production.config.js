const paths = require('./paths');
const CompressionPlugin = require("compression-webpack-plugin");

console.log(process.env.compress);

var plugins = [];

if (process.env.compress === 'true') {
    plugins.push(new CompressionPlugin({
        test: /\.js/
    }));
}


module.exports = {
    mode: 'production',
    entry: paths.src,
    output: {
        path: paths.dist,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: plugins
};