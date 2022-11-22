const {merge} = require('webpack-merge');
const config = require('./webpack.config.base');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 8080,
        compress: true
    }
})