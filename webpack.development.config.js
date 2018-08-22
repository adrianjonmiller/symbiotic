const paths = require('./paths');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: paths.src,
    devtool: 'source-map',
    output: {
        path: paths.dist,
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
    plugins: [
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
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