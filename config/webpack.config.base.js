const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ROOT_PATH = path.join(process.cwd());
const APP_PATH = path.join(ROOT_PATH, './src');
const ENTRY_PATH = path.join(ROOT_PATH, './entry');
const PUBLIC_PATH = path.join(ROOT_PATH, './public');

function getEntry() {
    let entryMap = {};
    fs.readdirSync(ENTRY_PATH).forEach(pathname => {
        let fullPathName = path.resolve(ENTRY_PATH, pathname);
        let stat = fs.statSync(fullPathName);
        if(stat.isDirectory()) {
            let fileName = path.resolve(fullPathName, 'index.jsx');
            let ts_fileName = path.resolve(fullPathName, 'index.tsx');
            if(fs.existsSync(fileName)) {
                entryMap[pathname] = fileName;
            }
            if(fs.existsSync(ts_fileName)) {
                entryMap[pathname] = ts_fileName;
            }
        }
        if(stat.isFile()) {
            let _arr = pathname.split('.');
            _arr.pop();
            entryMap[_arr.join('.')] = fullPathName;
        }
    })
    return entryMap;
}

module.exports = {
    entry: './src/main.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(ROOT_PATH, './dist'),
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': `${APP_PATH}/`
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },
            {
                test: /.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }, 'postcss-loader','sass-loader']
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(PUBLIC_PATH, './index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[contenthash:8]',
            chunkFilename: 'css/[name].css?[contenthash:8]',
            ignoreOrder: true
        }),
        new friendlyErrorsWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log']
                    }
                }
            }),
            new CssMinimizerPlugin()
        ],
        // runtimeChunk: {
        //     name: 'runtime'
        // },
        // splitChunks: {
        //     cacheGroups: {
        //         libs: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'libs',
        //             chunks: 'all',
        //             priority: 10,
        //             enforce: true
        //         },
        //         commoncss: {
        //             test: /(common.scss)/,
        //             chunks: 'all',
        //             name: 'common',
        //             priority: 10,
        //             enforce: true
        //         }
        //     }
        // }
    }

}