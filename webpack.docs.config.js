const paths = require('./paths');
const files = require('./files');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: files.docs.app,
    devtool: 'source-map',
    output: {
        path: paths.docs,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 5000,
                server: {
                    baseDir: ['docs', 'dist']
                },
                files: "docs/**/*"
            },{
                reload: false
            }
        )
    ]
}