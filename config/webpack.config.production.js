const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.config.base');

const GLOBALS = {
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    },
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
};

module.exports = merge(config, {
    devtool: 'cheap-module-source-map',
    entry: {
        application: './src/index.jsx'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: false}),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.LoaderOptionsPlugin({ minimize: true, debug: false })
    ],
    module: {
        rules: [
            // Sass + CSS Modules
            {
                test: /\.module.scss$/,
                include: [path.join(__dirname, '../src')],
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            sourceMap: false,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    'resolve-url-loader',
                    'postcss-loader', {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                            sourceMap: false
                        }
                    }
                ]
            },
            // Sass
            {
                test: /\.scss$/,
                exclude: [
                    'node_modules/', /src\/.*.module.scss$/
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader', {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    }
});
