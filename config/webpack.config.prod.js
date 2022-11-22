const {merge} = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('./webpack.config.base');

module.exports = merge(config, {
    mode: 'production',
    plugins: [
        new ProgressBarPlugin()
    ]
})